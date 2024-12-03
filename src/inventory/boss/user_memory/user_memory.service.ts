import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemory } from './entities/user_memory.entity';
import { UserSnsFollowService } from 'src/inventory/sns/user_sns_follow/user_sns_follow.service';

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

    await userMemoryRepository.increment({ boss_id: boss_id }, 'memory', 1);

    const updateData = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    return updateData;
  }
}
