import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
  ) {}

  getRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Reward>(Reward)
      : this.rewardRepository;
  }

  async getReward(reward_id: number, qr?: QueryRunner) {
    const rewardRepository = this.getRewardRepository(qr);
    const result = await rewardRepository.find({
      where: {
        reward_id,
      },
    });

    return result;
  }
  async getRewardAll(qr?: QueryRunner) {
    const rewardRepository = this.getRewardRepository(qr);

    const result = await rewardRepository
      .createQueryBuilder('reward')
      .select(['reward.id', 'reward.reward_id', 'reward.item_id'])
      .addSelect('reward.item_count', 'item_qty') // ✅ 별칭 적용 방법 수정
      .getRawMany(); // ✅ getRawMany() 사용하여 가공된 데이터 반환

    return result;
  }
}
