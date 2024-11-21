import { Module } from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';
import { UserTunaTvController } from './user_tuna_tv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTv } from './entities/user_tuna_tv.entity';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsLevel } from 'src/static-table/sns/sns_level/entities/sns_level.entity';
import { SnsLikeRule } from 'src/static-table/sns/sns_like_rule/entities/sns_like_rule.entity';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTunaTv,
      SnsConfig,
      SnsLevel,
      SnsLikeRule,
      SnsReward,
    ]),
  ],
  exports: [UserTunaTvService],
  controllers: [UserTunaTvController],
  providers: [
    UserTunaTvService,
    SnsConfigService,
    SnsLevelService,
    SnsLikeRuleService,
    SnsRewardService,
  ],
})
export class UserTunaTvModule {}
