import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsReward } from './entities/user_sns_reward.entity';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Injectable()
export class UserSnsRewardService {
  constructor(
    @InjectRepository(UserSnsReward)
    private readonly userSnsRewardRepository: Repository<UserSnsReward>,
    private readonly snsRewardService: SnsRewardService,
    private readonly rewardOfferService: RewardOfferService,
  ) {}

  getSnsRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsReward>(UserSnsReward)
      : this.userSnsRewardRepository;
  }
}
