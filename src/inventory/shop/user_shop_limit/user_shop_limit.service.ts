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

@Injectable()
export class UserShopLimitService {
  constructor(
    @InjectRepository(UserShopLimit)
    private readonly userShopLimitRepository: Repository<UserShopLimit>,
    private readonly shopService: ShopService,
    private readonly shopPackageService: ShopPackageService,
    private readonly rewardOfferService: RewardOfferService,
  ) {}

  getUserShopLimitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserShopLimit>(UserShopLimit)
      : this.userShopLimitRepository;
  }

  async shopPurchase(user_id: string, shop_id: number, qr?: QueryRunner) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);
    const userShopLimit = await userShopLimitRepository.findOne({
      where: { user_id, shop_id },
    });

    const shopData = await this.shopService.getShop(shop_id, qr);
    const shopPackageList =
      (await this.shopPackageService.getShopPackageList(
        shopData.item_package_id,
        qr,
      )) || [];

    console.log('shopPackageList:', shopPackageList);
    console.log('Type of shopPackageList:', typeof shopPackageList);
    console.log('Is Array:', Array.isArray(shopPackageList));

    const items = Array.isArray(shopPackageList)
      ? shopPackageList.map(({ item_id, qty }) => ({ item_id, qty }))
      : [];

    const shopPackageBonusList =
      (await this.shopPackageService.getShopPackageList(
        shopData.bonus_item_package_id,
        qr,
      )) || [];

    const shopRewardItems = await this.rewardOfferService.rewardItemsArray(
      user_id,
      items,
    );
    console.log('shopRewardItems:', shopRewardItems);

    const bonusItems = Array.isArray(shopPackageBonusList)
      ? shopPackageBonusList.map(({ item_id, qty }) => ({ item_id, qty }))
      : [];

    const shopRewardBonusItems = await this.rewardOfferService.rewardItemsArray(
      user_id,
      bonusItems,
    );

    console.log('shopRewardBonusItems:', shopRewardBonusItems);

    userShopLimit.shop_id = shop_id;

    const result = await userShopLimitRepository.save(userShopLimit);

    return result;
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
