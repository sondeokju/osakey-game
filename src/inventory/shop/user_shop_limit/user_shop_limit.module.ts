import { Module } from '@nestjs/common';
import { UserShopLimitService } from './user_shop_limit.service';
import { UserShopLimitController } from './user_shop_limit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserShopLimit } from './entities/user_shop_limit.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { ShopModule } from 'src/static-table/shop/shop/shop.module';
import { ShopPackageModule } from 'src/static-table/shop/shop_package/shop_package.module';
import { ResourceManagerModule } from 'src/supervisor/resource_manager/resource_manager.module';
import { ItemModule } from 'src/static-table/item/item.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserShopLimit]),
    ShopModule,
    ShopPackageModule,
    RewardOfferModule,
    ResourceManagerModule,
    ItemModule,
    GameLogsModule,
  ],
  exports: [UserShopLimitService],
  controllers: [UserShopLimitController],
  providers: [UserShopLimitService],
})
export class UserShopLimitModule {}
