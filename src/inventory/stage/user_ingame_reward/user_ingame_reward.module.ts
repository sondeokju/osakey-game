import { Module } from '@nestjs/common';
import { UserIngameRewardService } from './user_ingame_reward.service';
import { UserIngameRewardController } from './user_ingame_reward.controller';

@Module({
  controllers: [UserIngameRewardController],
  providers: [UserIngameRewardService],
})
export class UserIngameRewardModule {}
