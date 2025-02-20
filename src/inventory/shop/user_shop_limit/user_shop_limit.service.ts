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
import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';

@Injectable()
export class UserShopLimitService {
  constructor(
    @InjectRepository(UserShopLimit)
    private readonly userShopLimitRepository: Repository<UserShopLimit>,
    private readonly shopService: ShopService,
    private readonly shopPackageService: ShopPackageService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly resourceManagerService: ResourceManagerService,
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

      await this.resourceCheckAndDeductError(user_id, shop_id, qr);

      const shopRewardData = await this.shopPurchaseReward(
        user_id,
        shop_id,
        qr,
      );
      console.log('shopRewardData:', shopRewardData);

      const userShopLimit = await this.shopPurchaseLimitCalcu(
        user_id,
        shop_id,
        qr,
      );

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
  async currencyCheckAndDeduct(
    user_id: string,
    shop_id: number,
    qr: QueryRunner,
  ) {
    const shopData = await this.shopService.getShop(shop_id, qr);

    // 차감할 리소스 초기화
    const resourceDeduction: {
      gord?: number;
      item?: { item_id: number; count: number };
      dia?: { amount: number; mode: 'free' | 'paid' | 'mixed' };
      exp?: number;
      battery?: number;
      secame_credit?: number;
    } = {};

    console.log('price_kind:', shopData.price_kind);
    console.log('gord:', shopData.price_count);
    switch (shopData.price_kind) {
      case 'free':
        return { success: true, message: 'Free item, no deduction required' };

      case 'gord':
        resourceDeduction.gord = shopData.price_count;
        break;

      case 'diamon_mix':
        resourceDeduction.dia = {
          amount: shopData.price_count,
          mode: 'mixed',
        };
        break;

      case 'diamon_paid':
        resourceDeduction.dia = {
          amount: shopData.price_count,
          mode: 'paid',
        };
        break;

      default:
        return { success: false, message: 'Invalid currency type' };
    }

    try {
      // 리소스 차감 수행
      await this.resourceManagerService.validateAndDeductResources(
        user_id,
        resourceDeduction,
        qr,
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async resourceCheckAndDeductError(
    user_id: string,
    shop_id: number,
    qr?: QueryRunner,
  ) {
    const currencyCheck = await this.currencyCheckAndDeduct(
      user_id,
      shop_id,
      qr,
    );

    console.log('currencyCheck:', currencyCheck);

    if (!currencyCheck.success) {
      let errorCode = 'PURCHASE_FAILED';
      let message = 'Purchase could not be completed';

      switch (currencyCheck.message) {
        case 'Free item, no deduction required':
          errorCode = 'FREE_ITEM';
          message = 'This item is free and does not require a purchase';
          break;

        case 'Invalid currency type':
          errorCode = 'INVALID_CURRENCY';
          message = 'The currency type is invalid';
          break;

        case 'Not enough Gord.':
          errorCode = 'INSUFFICIENT_GORD';
          message = 'You do not have enough Gord.';
          break;

        case 'Not enough items.':
          errorCode = 'INSUFFICIENT_ITEM';
          message = 'You do not have enough items.';
          break;

        case 'Not enough EXP.':
          errorCode = 'INSUFFICIENT_EXP';
          message = 'You do not have enough experience points.';
          break;

        case 'Failed to validate and deduct resources.':
          errorCode = 'RESOURCE_DEDUCTION_FAILED';
          message = 'Resource deduction failed due to an internal error.';
          break;

        default:
          errorCode = 'UNKNOWN_ERROR';
          message = currencyCheck.message || 'An unknown error occurred';
          break;
      }

      return {
        status: 403,
        success: false,
        errorCode,
        message,
        shop_id,
        timestamp: new Date().toISOString(),
      };
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

    const now = new Date();

    // 판매 기간 체크 (now가 sell_start보다 크거나 같고, sell_end보다 작거나 같아야 구매 가능)
    if (!(now >= userShopLimit.sell_start && now <= userShopLimit.sell_end)) {
      return { success: false, message: 'Out of sale period' };
    }

    return { success: true, message: 'Purchase allowed' };
  }

  async shopPurchaseLimitCalcu(
    user_id: string,
    shop_id: number,
    qr?: QueryRunner,
  ) {
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
    console.log('shopData:', shopData);

    console.log('shopData.item_package_count:', shopData.item_package_count);
    // item_package_count 개수만큼 반복하여 아이템 추가
    let shopPackageList = [];
    for (let i = 0; i < shopData.item_package_count; i++) {
      const packageItems =
        (await this.shopPackageService.getShopPackageList(
          shopData.item_package_id,
          qr,
        )) || [];
      shopPackageList = shopPackageList.concat(packageItems);
    }
    console.log('shopPackageList:', shopPackageList);

    // 중복된 item_id의 item_count 합산
    shopPackageList = shopPackageList.reduce((acc, item) => {
      const existingItem = acc.find(({ item_id }) => item_id === item.item_id);
      if (existingItem) {
        existingItem.item_count += item.item_count; // 기존 아이템에 수량 추가
      } else {
        acc.push({ ...item }); // 새로운 아이템 추가
      }
      return acc;
    }, []);

    console.log('중복된 item_id의 item_count 합산:', shopPackageList);

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

    // bonus_item_package_count 개수만큼 반복하여 보너스 아이템 추가
    let shopPackageBonusList = [];
    for (let i = 0; i < shopData.bonus_item_package_count; i++) {
      const bonusPackageItems =
        (await this.shopPackageService.getShopPackageList(
          shopData.bonus_item_package_id,
          qr,
        )) || [];
      shopPackageBonusList = shopPackageBonusList.concat(bonusPackageItems);
    }

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
