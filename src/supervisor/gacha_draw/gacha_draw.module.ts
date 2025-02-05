import { Module } from '@nestjs/common';
import { GachaDrawService } from './gacha_draw.service';
import { GachaDrawController } from './gacha_draw.controller';
import { RewardOfferModule } from '../reward_offer/reward_offer.module';
import { GachaModule } from 'src/static-table/draw/gacha/gacha.module';
import { GachaOutputModule } from 'src/static-table/draw/gacha_output/gacha_output.module';
import { UserGachaCheckModule } from './user_gacha_check/user_gacha_check.module';
import { ItemModule } from 'src/static-table/item/item.module';
import { EquipModule } from 'src/static-table/equipment/equip/equip.module';
import { ItemService } from 'src/static-table/item/item.service';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';

@Module({
  imports: [
    RewardOfferModule,
    GachaModule,
    GachaOutputModule,
    UserGachaCheckModule,
    ItemModule,
    EquipModule,
  ],
  exports: [GachaDrawService],
  controllers: [GachaDrawController],
  providers: [GachaDrawService, ItemService, EquipService],
})
export class GachaDrawModule {}
