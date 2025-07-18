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
import { Users } from 'src/users/entity/users.entity';

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

  async memoryAdd(user_id: string, boss_id: number, qr?: QueryRunner) {
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

  async memoryIncrease(user_id: string, boss_id: number, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    if (!userMemory) {
      throw new NotFoundException('boss memory data not enough');
    }

    const updateData = await userMemoryRepository.increment(
      { user_id, boss_id },
      'memory',
      1,
    );

    return updateData;
  }

  async memoryDecrease(user_id: string, boss_id: number, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.findOne({
      where: {
        user_id,
        boss_id,
      },
    });

    console.log('userMemory', userMemory);
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

  async getFollowedUsersWithMemory(currentUserId: string, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);

    const result = await userMemoryRepository
      .createQueryBuilder('um')
      .innerJoin(UserSnsFollow, 'usf', 'usf.follow_user_id = um.user_id')
      .where('usf.user_id = :currentUserId', { currentUserId })
      .andWhere('usf.follow_yn = :followYn', { followYn: 'Y' })
      .andWhere('um.memory >= :memoryValue', { memoryValue: '0' })
      .select(['um.user_id', 'um.boss_id', 'um.memory'])
      .getMany();

    return result;
  }

  async getFollowedUsersWithBossMemory(
    user_id: string,
    boss_id: number,
    qr?: QueryRunner,
  ) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const result = await userMemoryRepository
      .createQueryBuilder('um')
      .innerJoin(UserSnsFollow, 'usf', 'usf.follow_user_id = um.user_id')
      .innerJoin(Users, 'u', 'u.id = um.user_id') // Users 테이블 조인
      .where('usf.user_id = :user_id', { user_id }) // 내가 팔로우하는 유저
      .andWhere('usf.follow_yn = :followYn', { followYn: 'Y' }) // 팔로우 상태 확인
      .andWhere('um.boss_id = :boss_id', { boss_id }) // 특정 보스 ID
      .andWhere('um.memory >= :memoryValue', { memoryValue: '0' }) // 메모리가 있는 유저
      .select([
        'um.id as id',
        'um.user_id as user_id', // UserMemory 테이블 정보
        'um.boss_id as boss_id',
        'um.memory as memory',
        'u.nickname as nickname', // Users 테이블에서 nickname
        'u.level as user_level', // Users 테이블에서 user_level
      ])
      .getRawMany(); // getRawMany를 사용해 직접 필드명으로 매핑

    return result;
  }

  async getUserMemory(user_id: string, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.find({
      where: {
        user_id,
      },
    });

    // if (!userMemory) {
    //   throw new NotFoundException('boss memory data not found');
    // }

    return userMemory;
  }

  async getUserMemoryId(user_id: string, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);
    const userMemory = await userMemoryRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userMemory) {
      throw new NotFoundException('boss memory data not found');
    }

    return userMemory;
  }

  async getUserMemoryBossId(bossIds: any, qr?: QueryRunner) {
    const userMemoryRepository = this.getUserMemoryRepository(qr);

    const result = await userMemoryRepository
      .createQueryBuilder('userMemory')
      .where('userMemory.id IN (:...bossIds)', { bossIds })
      .getMany();

    return result;
  }
}
