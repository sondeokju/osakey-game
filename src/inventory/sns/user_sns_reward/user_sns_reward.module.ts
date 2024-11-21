import { Module } from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';
import { UserSnsRewardController } from './user_sns_reward.controller';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { UserSnsReward } from './entities/user_sns_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSnsReward, SnsReward])],
  exports: [UserSnsRewardService],
  controllers: [UserSnsRewardController],
  providers: [UserSnsRewardService, SnsRewardService, RewardOfferService],
})
export class UserSnsRewardModule {}
