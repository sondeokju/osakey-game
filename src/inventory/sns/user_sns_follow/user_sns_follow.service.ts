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

  async followAdd(user_id: number, follow_user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    const result = {
      user_id,
      follow_user_id,
    };

    if (!userSnsFollowData) {
      await userSnsFollowRepository.save({
        ...userSnsFollowData,
        user_id,
        follow_user_id,
      });
    }

    return result;
  }

  async unFollow(user_id: number, follow_user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    if (userSnsFollowData) {
      await userSnsFollowRepository.save({
        ...userSnsFollowData,
        follow_yn: 'N',
      });
    }

    const result = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    return result;
  }
  async followList(user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.find({
      where: {
        user_id,
      },
    });

    if (!userSnsFollowData) {
    }

    return userSnsFollowData;
  }
}
