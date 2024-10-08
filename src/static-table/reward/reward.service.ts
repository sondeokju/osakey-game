import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardGroupRepository: Repository<Reward>,
  ) {}

  async getReward(reward: number) {
    // const result = await this.rewardGroupRepository.findOne({
    //   where: {
    //     reward,
    //   },
    // });

    return 0;
  }
}
