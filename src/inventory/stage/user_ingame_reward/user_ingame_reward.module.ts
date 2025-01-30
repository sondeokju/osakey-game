import { Module } from '@nestjs/common';
import { UserIngameRewardService } from './user_ingame_reward.service';
import { UserIngameRewardController } from './user_ingame_reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIngameReward } from './entities/user_ingame_reward.entity';
import { BattleStageModule } from 'src/static-table/stage/battle_stage/battle_stage.module';
import { RunStageModule } from 'src/static-table/stage/run_stage/run_stage.module';
import { PuzzleStageModule } from 'src/static-table/stage/puzzle_stage/puzzle_stage.module';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserIngameReward]),
    BattleStageModule,
    RunStageModule,
    PuzzleStageModule,
    RewardOfferModule,
  ],
  exports: [UserIngameRewardService],
  controllers: [UserIngameRewardController],
  providers: [UserIngameRewardService],
})
export class UserIngameRewardModule {}
