import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { TutorialReward } from './entities/tutorial_reward.entity';

@Injectable()
export class TutorialRewardService {
  constructor(
    @InjectRepository(TutorialReward)
    private readonly tutorialRewardRepository: Repository<TutorialReward>,
  ) {}

  getTutorialRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<TutorialReward>(TutorialReward)
      : this.tutorialRewardRepository;
  }

  async getTutorialRewardAll(qr?: QueryRunner) {
    const tutorialRewardRepository = this.getTutorialRewardRepository(qr);
    const result = await tutorialRewardRepository.find({});
    return result;
  }

  async getTutorialReward(id: number, qr?: QueryRunner) {
    const tutorialRewardRepository = this.getTutorialRewardRepository(qr);
    const result = await tutorialRewardRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
