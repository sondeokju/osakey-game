import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DispatchReward } from './entities/dispatch_reward.entity';

@Injectable()
export class DispatchRewardService {
  constructor(
    @InjectRepository(DispatchReward)
    private readonly dispatchConfigRepository: Repository<DispatchReward>,
  ) {}

  getDispatchRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<DispatchReward>(DispatchReward)
      : this.dispatchConfigRepository;
  }

  async getDispatchConfigAll(qr?: QueryRunner) {
    const dispatchRewardRepository = this.getDispatchRewardRepository(qr);
    const result = await dispatchRewardRepository.find({});
    return result;
  }

  async getDispatchReward(mission_rank: string, qr?: QueryRunner) {
    const dispatchRewardRepository = this.getDispatchRewardRepository(qr);
    const result = await dispatchRewardRepository.find({
      where: {
        mission_rank,
      },
    });

    return result;
  }
}
