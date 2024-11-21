import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsLevel } from './entities/user_sns_level.entity';

@Injectable()
export class UserSnsLevelService {
  constructor(
    @InjectRepository(UserSnsLevel)
    private readonly userSnsLevelRepository: Repository<UserSnsLevel>,
    private readonly snsConfigService: SnsConfigService,
    private readonly snsLevelService: SnsLevelService,
    private readonly snsLikeRuleService: SnsLikeRuleService,
    private readonly snsRewardService: SnsRewardService,
  ) {}

  getUserSnsLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsLevel>(UserSnsLevel)
      : this.userSnsLevelRepository;
  }
}
