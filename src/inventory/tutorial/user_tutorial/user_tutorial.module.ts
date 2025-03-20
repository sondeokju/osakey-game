import { Module } from '@nestjs/common';
import { UserTutorialService } from './user_tutorial.service';
import { UserTutorialController } from './user_tutorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTutorial } from './entities/user_tutorial.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { TutorialRewardModule } from 'src/static-table/tutorial/tutorial_reward/tutorial_reward.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTutorial]),
    RewardOfferModule,
    TutorialRewardModule,
    GameLogsModule,
  ],
  exports: [UserTutorialService],
  controllers: [UserTutorialController],
  providers: [UserTutorialService],
})
export class UserTutorialModule {}
