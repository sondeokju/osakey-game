import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserShopLimit } from './entities/user_shop_limit.entity';
import { ShopService } from 'src/static-table/shop/shop/shop.service';
import { ShopPackageService } from 'src/static-table/shop/shop_package/shop_package.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UserShopLimitService {
  constructor(
    @InjectRepository(UserShopLimit)
    private readonly userShopLimitRepository: Repository<UserShopLimit>,
    private readonly shopService: ShopService,
    private readonly shopPackageService: ShopPackageService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly dataSource: DataSource,
  ) {}

  getUserShopLimitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserShopLimit>(UserShopLimit)
      : this.userShopLimitRepository;
  }

  async shopPurchase(user_id: string, shop_id: number, qr?: QueryRunner) {
    const qrInstance = qr ?? this.dataSource.createQueryRunner();
    const shouldRelease = !qr;

    if (shouldRelease) {
      await qrInstance.connect();
      await qrInstance.startTransaction();
    }

    try {
      const limitCheck = await this.shopPurchaseLimitCheck(
        user_id,
        shop_id,
        qr,
      );

      if (!limitCheck.success) {
        return {
          status: 403,
          success: false,
          errorCode: 'PURCHASE_LIMIT_EXCEEDED',
          message: 'Purchase limit exceeded',
          shop_id: shop_id,
          timestamp: new Date().toISOString(),
        };
      }

      const shopRewardData = await this.shopPurchaseReward(
        user_id,
        shop_id,
        qr,
      );
      console.log('shopRewardData:', shopRewardData);

      const userShopLimit = await this.shopPurchaseLimit(user_id, shop_id, qr);

      if (shouldRelease) {
        await qrInstance.commitTransaction();
      }
      return {
        reward: {
          userItemData: shopRewardData,
        },
        userShopLimit,
      };
    } catch (error) {
      if (shouldRelease) {
        await qrInstance.rollbackTransaction();
      }
      throw error;
    } finally {
      if (shouldRelease) {
        await qrInstance.release();
      }
    }
  }

  async shopPurchaseLimitCheck(
    user_id: string,
    shop_id: number,
    qr?: QueryRunner,
  ) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);
    const userShopLimit = await userShopLimitRepository.findOne({
      where: { user_id, shop_id },
    });

    if (!userShopLimit) {
      return { success: false, message: 'No purchase record found' };
    }

    if (userShopLimit.buy_limit_count <= 0) {
      return { success: false, message: 'Purchase limit exceeded' };
    }

    return { success: true, message: 'Purchase allowed' };
  }

  async shopPurchaseLimit(user_id: string, shop_id: number, qr?: QueryRunner) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);
    let userShopLimit = await userShopLimitRepository.findOne({
      where: { user_id, shop_id },
    });
    const shopData = await this.shopService.getShop(shop_id, qr);

    if (!userShopLimit) {
      userShopLimit = userShopLimitRepository.create({ user_id, shop_id });
      userShopLimit.buy_limit_type = shopData.buy_limit_type;
      userShopLimit.buy_limit_count = shopData.buy_limit_count;
      userShopLimit.sell_start = shopData.sell_start;
      userShopLimit.sell_end = shopData.sell_end;
    }
    userShopLimit.buy_limit_count -= 1;

    const result = await userShopLimitRepository.save(userShopLimit);

    return result;
  }

  async shopPurchaseReward(user_id: string, shop_id: number, qr?: QueryRunner) {
    const shopData = await this.shopService.getShop(shop_id, qr);
    const shopPackageList =
      (await this.shopPackageService.getShopPackageList(
        shopData.item_package_id,
        qr,
      )) || [];

    const items = shopPackageList.map(({ item_id, item_count }) => ({
      item_id,
      item_count,
    }));
    const shopRewardItems = await this.rewardOfferService.rewardItemsArray(
      user_id,
      items,
      qr,
    );
    console.log('shopRewardItems:', shopRewardItems);

    const shopPackageBonusList =
      (await this.shopPackageService.getShopPackageList(
        shopData.bonus_item_package_id,
        qr,
      )) || [];
    const bonusItems = shopPackageBonusList.map(({ item_id, item_count }) => ({
      item_id,
      item_count,
    }));
    const shopRewardBonusItems = await this.rewardOfferService.rewardItemsArray(
      user_id,
      bonusItems,
      qr,
    );
    console.log('shopRewardBonusItems:', shopRewardBonusItems);

    return [...shopRewardItems, ...shopRewardBonusItems];
  }

  async getUserShopLimitAll(user_id: string, qr?: QueryRunner) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);
    const userShopLimit = await userShopLimitRepository.find({
      where: { user_id },
    });

    return userShopLimit;
  }

  async shopLimitAdd(
    user_id: string,
    shop_id: number,
    free_limit_yn: string,
    buy_limit_type: string,
    buy_limit_count: number,
    sell_start: Date,
    sell_end: Date,
    qr?: QueryRunner,
  ) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);

    let userShopLimit = await userShopLimitRepository.findOne({
      where: { user_id, shop_id },
    });

    if (!userShopLimit) {
      userShopLimit = userShopLimitRepository.create({
        user_id,
        shop_id,
        free_limit_yn,
        buy_limit_type,
        buy_limit_count,
        sell_start,
        sell_end,
      });
    } else {
      userShopLimit.buy_limit_type = free_limit_yn;
      userShopLimit.buy_limit_type = buy_limit_type;
      userShopLimit.buy_limit_count += buy_limit_count;
      userShopLimit.sell_start = sell_start;
      userShopLimit.sell_end = sell_end;
    }

    const result = await userShopLimitRepository.save(userShopLimit);

    return result;
  }
}
