import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  QueryRunner,
  Repository,
} from 'typeorm';
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

  // async getSnsReward(like_cnt: number, qr?: QueryRunner) {
  //   const snsRewardRepository = this.getSnsRewardRepository(qr);
  //   const result = await snsRewardRepository.findOne({
  //     where: {
  //       like_min: LessThanOrEqual(like_cnt), // like_cnt >= like_min
  //       like_max: MoreThanOrEqual(like_cnt), // like_cnt <= like_max
  //     },
  //   });

  //   return result;
  // }

  async getSnsReward(like_cnt: number, qr?: QueryRunner) {
    const snsRewardRepository = this.getSnsRewardRepository(qr);

    const result = await snsRewardRepository
      .createQueryBuilder('sns_reward')
      .where('sns_reward.like_min <= :like_cnt', { like_cnt })
      .andWhere(
        '(sns_reward.like_max >= :like_cnt OR sns_reward.like_max = 0)',
        { like_cnt },
      )
      .orderBy('sns_reward.id', 'ASC') // 정렬 필요시 추가
      .limit(1)
      .getOne();

    return result;
  }
}
