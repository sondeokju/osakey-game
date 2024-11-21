import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsFollow } from './entities/user_sns_follow.entity';

@Injectable()
export class UserSnsFollowService {
  constructor(
    @InjectRepository(UserSnsFollow)
    private readonly userSnsFollowRepository: Repository<UserSnsFollow>,
    private readonly snsConfigService: SnsConfigService,
    private readonly snsLevelService: SnsLevelService,
    private readonly snsLikeRuleService: SnsLikeRuleService,
    private readonly snsRewardService: SnsRewardService,
  ) {}

  getUserSnsFollowRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsFollow>(UserSnsFollow)
      : this.userSnsFollowRepository;
  }
}
