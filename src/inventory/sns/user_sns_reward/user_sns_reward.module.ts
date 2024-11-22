import { Module } from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';
import { UserSnsRewardController } from './user_sns_reward.controller';
import { UserSnsReward } from './entities/user_sns_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserSnsReward])],
  exports: [UserSnsRewardService],
  controllers: [UserSnsRewardController],
  providers: [UserSnsRewardService],
})
export class UserSnsRewardModule {}
