import { Module } from '@nestjs/common';
import { UserSnsLevelService } from './user_sns_level.service';
import { UserSnsLevelController } from './user_sns_level.controller';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsLevel } from 'src/static-table/sns/sns_level/entities/sns_level.entity';
import { SnsLikeRule } from 'src/static-table/sns/sns_like_rule/entities/sns_like_rule.entity';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsLevel } from './entities/user_sns_level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';
import { UserTunaTv } from '../user_tuna_tv/entities/user_tuna_tv.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSnsLevel,
      SnsConfig,
      SnsLevel,
      SnsLikeRule,
      SnsReward,
      UserTunaTv,
    ]),
  ],
  exports: [UserSnsLevelService],
  controllers: [UserSnsLevelController],
  providers: [
    UserSnsLevelService,
    SnsConfigService,
    SnsLevelService,
    SnsLikeRuleService,
    SnsRewardService,
    UserTunaTvService,
  ],
})
export class UserSnsLevelModule {}
