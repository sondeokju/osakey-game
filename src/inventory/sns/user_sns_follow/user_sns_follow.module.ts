import { Module } from '@nestjs/common';

import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsLevel } from 'src/static-table/sns/sns_level/entities/sns_level.entity';
import { SnsLikeRule } from 'src/static-table/sns/sns_like_rule/entities/sns_like_rule.entity';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSnsFollow } from './entities/user_sns_follow.entity';
import { UserSnsFollowService } from './user_sns_follow.service';
import { UserSnsFollowController } from './user_sns_follow.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSnsFollow,
      SnsConfig,
      SnsLevel,
      SnsLikeRule,
      SnsReward,
    ]),
  ],
  exports: [UserSnsFollowService],
  controllers: [UserSnsFollowController],
  providers: [
    UserSnsFollowService,
    SnsConfigService,
    SnsLevelService,
    SnsLikeRuleService,
    SnsRewardService,
  ],
})
export class UserSnsFollowModule {}
