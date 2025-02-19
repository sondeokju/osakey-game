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
      const userShopLimitRepository =
        this.getUserShopLimitRepository(qrInstance);
      let userShopLimit = await userShopLimitRepository.findOne({
        where: { user_id, shop_id },
      });

      if (!userShopLimit) {
        userShopLimit = userShopLimitRepository.create({ user_id, shop_id });
      }

      const shopData = await this.shopService.getShop(shop_id, qrInstance);
      const shopPackageList =
        (await this.shopPackageService.getShopPackageList(
          shopData.item_package_id,
          qrInstance,
        )) || [];

      const items = shopPackageList.map(({ item_id, item_count }) => ({
        item_id,
        item_count,
      }));
      const shopRewardItems = await this.rewardOfferService.rewardItemsArray(
        user_id,
        items,
        qrInstance,
      );
      console.log('shopRewardItems:', shopRewardItems);

      const shopPackageBonusList =
        (await this.shopPackageService.getShopPackageList(
          shopData.bonus_item_package_id,
          qrInstance,
        )) || [];
      const bonusItems = shopPackageBonusList.map(
        ({ item_id, item_count }) => ({ item_id, item_count }),
      );
      const shopRewardBonusItems =
        await this.rewardOfferService.rewardItemsArray(
          user_id,
          bonusItems,
          qrInstance,
        );
      console.log('shopRewardBonusItems:', shopRewardBonusItems);

      const result = await userShopLimitRepository.save(userShopLimit);

      if (shouldRelease) {
        await qrInstance.commitTransaction();
      }
      return result;
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

  // async shopPurchase(user_id: string, shop_id: number, qr?: QueryRunner) {
  //   const userShopLimitRepository = this.getUserShopLimitRepository(qr);
  //   const userShopLimit = await userShopLimitRepository.findOne({
  //     where: { user_id, shop_id },
  //   });

  //   const shopData = await this.shopService.getShop(shop_id, qr);
  //   const shopPackageList =
  //     (await this.shopPackageService.getShopPackageList(
  //       shopData.item_package_id,
  //       qr,
  //     )) || [];

  //   const items = Array.isArray(shopPackageList)
  //     ? shopPackageList.map(({ item_id, item_count }) => ({
  //         item_id,
  //         item_count,
  //       }))
  //     : [];

  //   const shopRewardItems = await this.rewardOfferService.rewardItemsArray(
  //     user_id,
  //     items,
  //     qr,
  //   );
  //   console.log('shopRewardItems:', shopRewardItems);

  //   const shopPackageBonusList =
  //     (await this.shopPackageService.getShopPackageList(
  //       shopData.bonus_item_package_id,
  //       qr,
  //     )) || [];

  //   const bonusItems = Array.isArray(shopPackageBonusList)
  //     ? shopPackageBonusList.map(({ item_id, item_count }) => ({
  //         item_id,
  //         item_count,
  //       }))
  //     : [];

  //   const shopRewardBonusItems = await this.rewardOfferService.rewardItemsArray(
  //     user_id,
  //     bonusItems,
  //   );

  //   console.log('shopRewardBonusItems:', shopRewardBonusItems);

  //   userShopLimit.shop_id = shop_id;

  //   const result = await userShopLimitRepository.save(userShopLimit);

  //   return result;
  // }

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
