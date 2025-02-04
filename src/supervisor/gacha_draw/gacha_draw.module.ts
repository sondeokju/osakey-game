import { Module } from '@nestjs/common';
import { GachaDrawService } from './gacha_draw.service';
import { GachaDrawController } from './gacha_draw.controller';
import { RewardOfferModule } from '../reward_offer/reward_offer.module';
import { GachaModule } from 'src/static-table/draw/gacha/gacha.module';
import { GachaOutputModule } from 'src/static-table/draw/gacha_output/gacha_output.module';

@Module({
  imports: [RewardOfferModule, GachaModule, GachaOutputModule],
  exports: [GachaDrawService],
  controllers: [GachaDrawController],
  providers: [GachaDrawService],
})
export class GachaDrawModule {}
