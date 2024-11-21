import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, QueryRunner, Repository } from 'typeorm';
import { SnsReward } from './entities/sns_reward.entity';

@Injectable()
export class SnsRewardService {
  constructor(
    @InjectRepository(SnsReward)
    private readonly snsRewardRepository: Repository<SnsReward>,
  ) {}

  getSnsRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SnsReward>(SnsReward)
      : this.snsRewardRepository;
  }

  async getSnsRewardAll(qr?: QueryRunner) {
    const snsRewardRepository = this.getSnsRewardRepository(qr);
    const result = await snsRewardRepository.find({});
    return result;
  }

  async getSnsReward(like_cnt: number, qr?: QueryRunner) {
    const snsRewardRepository = this.getSnsRewardRepository(qr);
    const result = await snsRewardRepository.findOne({
      where: {
        like_min: Between(like_cnt, Number.MIN_SAFE_INTEGER),
        like_max: Between(Number.MAX_SAFE_INTEGER, like_cnt),
      },
    });

    return result;
  }
}
