import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemory } from './entities/user_memory.entity';
import { UserSnsFollowService } from 'src/inventory/sns/user_sns_follow/user_sns_follow.service';
import { UserSnsFollow } from 'src/inventory/sns/user_sns_follow/entities/user_sns_follow.entity';

@Injectable()
export class UserMemoryService {
  constructor(
    @InjectRepository(UserMemory)
    private readonly userMemoryRepository: Repository<UserMemory>,
    private readonly userSnsFollowService: UserSnsFollowService,
  ) {}

  getUserMemoryRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMemory>(UserMemory)
      : this.userMemoryRepository;
  }

  async memoryAdd(user_id: number, boss_id: number, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    if (!userMemory) {
      throw new NotFoundException('boss memory data not found');
    }

    await userMemoryRepository.increment({ user_id, boss_id }, 'memory', 1);

    const updateData = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    return updateData;
  }

  async memoryDecrease(user_id: number, boss_id: number, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    if (!userMemory || userMemory.memory <= 0) {
      throw new NotFoundException('boss memory data not enough');
    }

    await userMemoryRepository.decrement({ user_id, boss_id }, 'memory', 1);

    const updateData = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    return updateData;
  }

  async getFollowedUsersWithMemory(currentUserId: number, qr?: QueryRunner) {
    const userMemoryRentRepository = this.getUserMemoryRepository(qr);

    const result = await userMemoryRentRepository
      .createQueryBuilder('um')
      .innerJoin(UserSnsFollow, 'usf', 'usf.follow_user_id = um.user_id')
      .where('usf.user_id = :currentUserId', { currentUserId })
      .andWhere('usf.follow_yn = :followYn', { followYn: 'Y' })
      .andWhere('um.memory != :memoryValue', { memoryValue: '0' })
      .select(['um.user_id', 'um.boss_id', 'um.memory'])
      .getMany();

    return result;
  }

  async getUserMemory(user_id: number, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.find({
      where: {
        user_id,
      },
    });

    if (!userMemory) {
      throw new NotFoundException('boss memory data not found');
    }

    return userMemory;
  }
}
