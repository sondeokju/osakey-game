import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemoryRent } from './entities/user_memory_rent.entity';
import { UserMemoryService } from '../user_memory/user_memory.service';
import { UserMemory } from '../user_memory/entities/user_memory.entity';

@Injectable()
export class UserMemoryRentService {
  constructor(
    @InjectRepository(UserMemoryRent)
    private readonly userMemoryRentRepository: Repository<UserMemoryRent>,
    private readonly userMemoryService: UserMemoryService,
  ) {}

  getUserMemoryRentRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMemoryRent>(UserMemoryRent)
      : this.userMemoryRentRepository;
  }

  async memoryRent(
    user_id: number,
    rent_memory_user_id: number,
    user_memory_id: number,
    qr?: QueryRunner,
  ) {
    const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);
    let userMemoryRent = await userMemoryRentRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userMemoryRent) {
      userMemoryRent = userMemoryRentRepository.create({
        user_id,
        rent_memory_user_1: 0,
        rent_memory_user_2: 0,
        rent_memory_user_3: 0,
        rent_boss_1: 0,
        rent_boss_2: 0,
        rent_boss_3: 0,
      });
    }

    const memoryRentCount = [
      userMemoryRent.rent_boss_1,
      userMemoryRent.rent_boss_2,
      userMemoryRent.rent_boss_3,
    ].filter(Boolean).length;

    if (memoryRentCount >= 3) {
      return { message: 'memory rent over 3' };
    }

    console.log('user_memory_id:', user_memory_id);
    switch (memoryRentCount) {
      case 0:
        userMemoryRent.rent_memory_user_1 = rent_memory_user_id;
        userMemoryRent.rent_boss_1 = user_memory_id;
        break;
      case 1:
        userMemoryRent.rent_memory_user_2 = rent_memory_user_id;
        userMemoryRent.rent_boss_2 = user_memory_id;
        break;
      case 2:
        userMemoryRent.rent_memory_user_3 = rent_memory_user_id;
        userMemoryRent.rent_boss_3 = user_memory_id;
        break;
    }

    await this.userMemoryService.memoryDecrease(user_memory_id);

    const updatedData = await userMemoryRentRepository.save(userMemoryRent);
    const userMemory =
      await this.userMemoryService.getUserMemoryId(user_memory_id);

    const result = {
      updatedData,
      userMemory,
    };

    return result;
  }

  async getUserMemoryRent(user_id: number, qr?: QueryRunner) {
    const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);
    const userMemoryRent = await userMemoryRentRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userMemoryRent) {
      throw new NotFoundException('boss memory rent data not found');
    }

    const bossIds = [
      userMemoryRent.rent_boss_1,
      userMemoryRent.rent_boss_2,
      userMemoryRent.rent_boss_3,
    ];

    const userMemory = await this.userMemoryService.getUserMemoryBossId(
      bossIds,
      qr,
    );

    const result = {
      userMemoryRent,
      userMemory,
    };

    return result;
  }

  async getUserMemoryWithRent(user_id: number, qr?: QueryRunner) {
    const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);

    const result = await userMemoryRentRepository
      .createQueryBuilder('user_memory_rent')
      .leftJoinAndMapMany(
        'user_memory_rent.userMemories', // 결과 객체에 매핑될 필드 이름
        'user_memory', // JOIN할 테이블
        'user_memory', // alias
        `
      user_memory.id = user_memory_rent.rent_boss_1
      OR user_memory.id = user_memory_rent.rent_boss_2
      OR user_memory.id = user_memory_rent.rent_boss_3
      `,
      )
      .where('user_memory_rent.user_id = :user_id', { user_id })
      .select([
        'user_memory_rent',
        'user_memory', // userMemoryRent의 모든 컬럼
        'user_memory.boss_id', // userMemory의 boss_id
      ])
      .getRawMany();

    return result;
  }

  async rentMemoryClear(user_id: number, slot: number, qr?: QueryRunner) {
    const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);
    const userMemoryRent = await userMemoryRentRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userMemoryRent || +slot > 3) {
      throw new NotFoundException('memory slot not found');
    }

    let increase_user_memory_id = 0;

    switch (+slot) {
      case 1:
        increase_user_memory_id = userMemoryRent.rent_boss_1;
        userMemoryRent.rent_memory_user_1 = 0;
        userMemoryRent.rent_boss_1 = 0;
        break;
      case 2:
        increase_user_memory_id = userMemoryRent.rent_boss_2;
        userMemoryRent.rent_memory_user_2 = 0;
        userMemoryRent.rent_boss_2 = 0;
        break;
      case 3:
        increase_user_memory_id = userMemoryRent.rent_boss_3;
        userMemoryRent.rent_memory_user_3 = 0;
        userMemoryRent.rent_boss_3 = 0;
        break;
    }

    await userMemoryRentRepository.save({
      ...userMemoryRent,
    });

    await this.userMemoryService.memoryIncrease(increase_user_memory_id);

    const result = await userMemoryRentRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
  }
}
