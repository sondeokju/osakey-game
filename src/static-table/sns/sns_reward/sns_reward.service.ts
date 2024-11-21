import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
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

  async getNpcAll(qr?: QueryRunner) {
    const snsRewardRepository = this.getSnsRewardRepository(qr);
    const result = await snsRewardRepository.find({});
    return result;
  }
}
