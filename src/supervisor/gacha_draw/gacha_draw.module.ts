import { Module } from '@nestjs/common';
import { GachaDrawService } from './gacha_draw.service';
import { GachaDrawController } from './gacha_draw.controller';
import { RewardOfferModule } from '../reward_offer/reward_offer.module';

@Module({
  imports: [RewardOfferModule],
  exports: [GachaDrawService],
  controllers: [GachaDrawController],
  providers: [GachaDrawService],
})
export class GachaDrawModule {}
