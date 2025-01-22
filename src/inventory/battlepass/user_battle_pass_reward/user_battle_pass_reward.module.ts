import { Module } from '@nestjs/common';
import { UserBattlePassRewardService } from './user_battle_pass_reward.service';
import { UserBattlePassRewardController } from './user_battle_pass_reward.controller';

@Module({
  controllers: [UserBattlePassRewardController],
  providers: [UserBattlePassRewardService],
})
export class UserBattlePassRewardModule {}
