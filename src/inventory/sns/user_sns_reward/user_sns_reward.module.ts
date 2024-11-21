import { Module } from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';
import { UserSnsRewardController } from './user_sns_reward.controller';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsLevel } from 'src/static-table/sns/sns_level/entities/sns_level.entity';
import { SnsLikeRule } from 'src/static-table/sns/sns_like_rule/entities/sns_like_rule.entity';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsReward } from './entities/user_sns_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSnsReward,
      SnsConfig,
      SnsLevel,
      SnsLikeRule,
      SnsReward,
    ]),
  ],
  exports: [UserSnsRewardService],
  controllers: [UserSnsRewardController],
  providers: [
    UserSnsRewardService,
    SnsConfigService,
    SnsLevelService,
    SnsLikeRuleService,
    SnsRewardService,
    RewardOfferService,
  ],
})
export class UserSnsRewardModule {}
