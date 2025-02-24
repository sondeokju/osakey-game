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
import { ItemService } from 'src/static-table/item/item.service';

@Injectable()
export class UserShopLimitService {
  constructor(
    @InjectRepository(UserShopLimit)
    private readonly userShopLimitRepository: Repository<UserShopLimit>,
    private readonly shopService: ShopService,
    private readonly shopPackageService: ShopPackageService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly resourceManagerService: ResourceManagerService,
    private readonly itemService: ItemService,
    private readonly dataSource: DataSource,
  ) {}

  getUserShopLimitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserShopLimit>(UserShopLimit)
      : this.userShopLimitRepository;
  }

  async resourceReturn(resourceCheck: any, shop_id: number, qr?: QueryRunner) {
    const shopData = await this.shopService.getShop(shop_id, qr);
    let deductedCurrency = [];

    if (shopData.price_kind === 'diamond_mix') {
      const dia_free = await this.itemService.getItemName('diamond_free', qr);

      console.log('dia_free:', dia_free);
      const dia_paid = await this.itemService.getItemName('diamond_paid', qr);
      console.log('dia_paid:', dia_paid);

      deductedCurrency = [
        {
          item_id: dia_free.item_id,
          item_count: resourceCheck['reduceItem'].diamond_free,
        },
        {
          item_id: dia_paid.item_id,
          item_count: resourceCheck['reduceItem'].diamond_paid,
        },
      ];
    } else if (shopData.price_kind === 'diamond_free') {
      const item = await this.itemService.getItemName('diamond_free', qr);

      deductedCurrency = [
        {
          item_id: item.item_id,
          item_count: shopData.price_count,
        },
      ];
    } else if (shopData.price_kind === 'diamond_paid') {
      const item = await this.itemService.getItemName('diamond_paid', qr);

      deductedCurrency = [
        {
          item_id: item.item_id,
          item_count: shopData.price_count,
        },
      ];
    } else if (shopData.price_kind === 'gord') {
      const item = await this.itemService.getItemName('gord', qr);

      deductedCurrency = [
        {
          item_id: item.item_id,
          item_count: shopData.price_count,
        },
      ];
    } else if (shopData.price_kind === 'free') {
      deductedCurrency = [{}];
    } else if (shopData.price_kind === 'cash') {
      deductedCurrency = [{}];
    }

    return deductedCurrency;
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

      if (!limitCheck.hasError) {
        return limitCheck;
      }

      const resourceCheck = await this.resourceCheckAndDeduct(
        user_id,
        shop_id,
        qr,
      );

      console.log('resourceCheck:', resourceCheck);

      if (!resourceCheck.hasError) {
        return resourceCheck;
      }

      const deductedCurrency = await this.resourceReturn(
        resourceCheck,
        shop_id,
      );

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
        deductedCurrency,
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

  async resourceCheckAndDeduct(
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
    console.log('price_count:', shopData.price_count);
    switch (shopData.price_kind) {
      case 'free':
        return { hasError: true, message: 'Free item, no deduction required' };

      case 'gord':
        resourceDeduction.gord = shopData.price_count;
        break;

      case 'diamond_mix':
        console.log('--------------diamon_mix--------------');
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
        return { hasError: false, message: 'Invalid currency type' };
    }

    try {
      // 리소스 차감 수행
      const result =
        await this.resourceManagerService.validateAndDeductResources(
          user_id,
          resourceDeduction,
          qr,
        );
      return result;
    } catch (error) {
      return { hasError: false, message: error.message };
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

    if (!userShopLimit || userShopLimit.buy_limit_type === 'NONE') {
      return { hasError: true, message: 'Purchase allowed' };
    }

    if (userShopLimit.buy_limit_count <= 0) {
      //return { success: false, message: 'Purchase limit exceeded' };
      return {
        code: 0,
        message: `${shop_id} You have exceeded the shop purchase limit.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    if (userShopLimit.free_limit_yn === 'Y') {
      return {
        code: 0,
        message: `${shop_id} You have already used up your free diamond purchase.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    const now = new Date();

    // ✅ 구매 제한 시간 체크 (sell_start <= now && (now <= sell_end || now <= buy_limit_end_time))
    if (
      !(
        now >= userShopLimit.sell_start &&
        (now <= userShopLimit.sell_end ||
          now <= userShopLimit.buy_limit_end_time)
      )
    ) {
      return {
        code: 0,
        message: `${shop_id} You have exceeded the purchase time limit.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    // ✅ 구매 가능 시간 체크 (buy_limit_start_time <= now <= buy_limit_end_time)
    // if (
    //   !(
    //     now >= userShopLimit.buy_limit_start_time &&
    //     now <= userShopLimit.buy_limit_end_time
    //   )
    // ) {
    //   return {
    //     code: 0,
    //     message: `${shop_id} You have exceeded the individual shop purchase time limit.`,
    //     utcTimeString: new Date().toISOString(),
    //     hasError: false,
    //   };
    // }

    return { hasError: true, message: 'Purchase allowed' };
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

    console.log('shopData:', shopData); // 문제 확인용 로그

    // 날짜가 유효한지 확인하는 함수
    const isValidDate = (date: any) => {
      return date instanceof Date && !isNaN(date.getTime());
    };

    // sell_start와 sell_end가 유효하지 않으면 기본값을 설정
    const sellStart = isValidDate(new Date(shopData.sell_start))
      ? new Date(shopData.sell_start)
      : new Date();
    const sellEnd = isValidDate(new Date(shopData.sell_end))
      ? new Date(shopData.sell_end)
      : new Date();

    if (!userShopLimit) {
      userShopLimit = userShopLimitRepository.create({
        user_id,
        shop_id,
        buy_limit_type: shopData.buy_limit_type,
        buy_limit_count: shopData.buy_limit_count,
        sell_start: sellStart,
        sell_end: sellEnd,
      });
    }

    if (userShopLimit.buy_limit_count > 0) {
      userShopLimit.buy_limit_count -= 1;
    }

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

    // 날짜가 유효한지 확인하는 함수
    const isValidDate = (date: any) => {
      return date instanceof Date && !isNaN(date.getTime());
    };
    // sell_start와 sell_end가 유효하지 않으면 기본값을 설정
    const startDate = isValidDate(new Date(sell_start))
      ? new Date(sell_start)
      : new Date();
    const endDate = isValidDate(new Date(sell_end))
      ? new Date(sell_end)
      : new Date();

    if (!userShopLimit) {
      userShopLimit = userShopLimitRepository.create({
        user_id,
        shop_id,
        buy_limit_type,
        buy_limit_count,
        sell_start: startDate, // 기본값 적용
        sell_end: endDate, // 기본값 적용
      });
    } else {
      //userShopLimit.buy_limit_type = free_limit_yn;
      //userShopLimit.buy_limit_type = buy_limit_type;
      userShopLimit.buy_limit_count += buy_limit_count;
      //userShopLimit.sell_start = sell_start;
      //userShopLimit.sell_end = sell_end;
    }

    const result = await userShopLimitRepository.save(userShopLimit);

    return result;
  }

  async buyLimitTimeUpdate(user_id: string, shop_id: number, qr?: QueryRunner) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);

    let userShopLimit = await userShopLimitRepository.findOne({
      where: { user_id, shop_id },
    });

    const now = new Date();

    const shopData = await this.shopService.getShop(shop_id, qr);

    if (!userShopLimit) {
      userShopLimit = userShopLimitRepository.create({
        user_id,
        shop_id,
        buy_limit_type: shopData.buy_limit_type,
        buy_limit_count: shopData.buy_limit_count,
        sell_start: shopData.sell_start ?? new Date(),
        sell_end: shopData.sell_end ?? new Date(),
        buy_limit_start_time: now,
        buy_limit_end_time: new Date(
          now.getTime() + shopData.buy_limit_time * 60 * 60 * 1000,
        ),
      });
    } else {
      userShopLimit.buy_limit_start_time = now;
      userShopLimit.buy_limit_end_time = new Date(
        userShopLimit.buy_limit_end_time.getTime() +
          shopData.buy_limit_time * 60 * 60 * 1000,
      );
    }

    const result = await userShopLimitRepository.save(userShopLimit);

    return {
      userShopLimit: result,
    };
  }
}
