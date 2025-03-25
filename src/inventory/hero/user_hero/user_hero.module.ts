import { Module } from '@nestjs/common';
import { UserHeroService } from './user_hero.service';
import { UserHeroController } from './user_hero.controller';
import { UsersModule } from 'src/users/users.module';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { UserDispatchModule } from 'src/inventory/dispatch/user_dispatch/user_dispatch.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    UsersModule,
    HeroModule,
    RewardOfferModule,
    UserDispatchModule,
    GameLogsModule,
  ],
  exports: [UserHeroService],
  controllers: [UserHeroController],
  providers: [UserHeroService],
})
export class UserHeroModule {}
