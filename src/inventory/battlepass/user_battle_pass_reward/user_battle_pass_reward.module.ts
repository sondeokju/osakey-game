import { Module } from '@nestjs/common';
import { UserBattlePassRewardService } from './user_battle_pass_reward.service';
import { UserBattlePassRewardController } from './user_battle_pass_reward.controller';
import { UserBattlePassReward } from './entities/user_battle_pass_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserBattlePassReward])],
  exports: [UserBattlePassRewardService],
  controllers: [UserBattlePassRewardController],
  providers: [UserBattlePassRewardService],
})
export class UserBattlePassRewardModule {}
