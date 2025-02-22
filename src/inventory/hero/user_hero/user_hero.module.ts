import { Module } from '@nestjs/common';
import { UserHeroService } from './user_hero.service';
import { UserHeroController } from './user_hero.controller';
import { UsersModule } from 'src/users/users.module';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { UserDispatchModule } from 'src/inventory/dispatch/user_dispatch/user_dispatch.module';

@Module({
  imports: [UsersModule, HeroModule, RewardOfferModule, UserDispatchModule],
  exports: [UserHeroService],
  controllers: [UserHeroController],
  providers: [UserHeroService],
})
export class UserHeroModule {}
