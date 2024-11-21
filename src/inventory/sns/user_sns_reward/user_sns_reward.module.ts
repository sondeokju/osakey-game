import { Module } from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';
import { UserSnsRewardController } from './user_sns_reward.controller';

@Module({
  controllers: [UserSnsRewardController],
  providers: [UserSnsRewardService],
})
export class UserSnsRewardModule {}
