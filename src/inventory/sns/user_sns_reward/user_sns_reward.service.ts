import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSnsReward } from './entities/user_sns_reward.entity';

@Injectable()
export class UserSnsRewardService {
  constructor(
    @InjectRepository(UserSnsReward)
    private readonly userSnsRewardRepository: Repository<UserSnsReward>,
  ) {}

  getSnsRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsReward>(UserSnsReward)
      : this.userSnsRewardRepository;
  }
}
