import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserIngameReward } from 'src/inventory/reward/user_ingame_reward/entities/user_ingame_reward.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserIngameRewardService {
  constructor(
    @InjectRepository(UserIngameReward)
    private readonly userIngameRewardRepository: Repository<UserIngameReward>,
  ) {}

  getUserIngameRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserIngameReward>(UserIngameReward)
      : this.userIngameRewardRepository;
  }

  async getUserIngameReward(user_id: string, qr?: QueryRunner) {
    const userIngameRewardRepository = this.getUserIngameRewardRepository(qr);
    const result = await userIngameRewardRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
