import { ResourceManagerModule } from 'src/supervisor/resource_manager/resource_manager.module';
import { Module } from '@nestjs/common';
import { GachaDrawService } from './gacha_draw.service';
import { GachaDrawController } from './gacha_draw.controller';
import { RewardOfferModule } from '../reward_offer/reward_offer.module';
import { GachaModule } from 'src/static-table/draw/gacha/gacha.module';
import { GachaOutputModule } from 'src/static-table/draw/gacha_output/gacha_output.module';
import { UserGachaCheckModule } from './user_gacha_check/user_gacha_check.module';
import { ItemModule } from 'src/static-table/item/item.module';
import { EquipModule } from 'src/static-table/equipment/equip/equip.module';
import { UserEquipModule } from 'src/inventory/equipment/user_equip/user_equip.module';

@Module({
  imports: [
    RewardOfferModule,
    GachaModule,
    GachaOutputModule,
    UserGachaCheckModule,
    ItemModule,
    EquipModule,
    ResourceManagerModule,
    UserEquipModule,
  ],
  exports: [GachaDrawService],
  controllers: [GachaDrawController],
  providers: [GachaDrawService],
})
export class GachaDrawModule {}
