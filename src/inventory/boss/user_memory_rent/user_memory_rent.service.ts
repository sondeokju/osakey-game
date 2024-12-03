import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemoryRent } from './entities/user_memory_rent.entity';
import { UserSnsFollow } from 'src/inventory/sns/user_sns_follow/entities/user_sns_follow.entity';

@Injectable()
export class UserMemoryRentService {
  constructor(
    @InjectRepository(UserMemoryRent)
    private readonly userMemoryRentRepository: Repository<UserMemoryRent>,
  ) {}

  getUserMemoryRentRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMemoryRent>(UserMemoryRent)
      : this.userMemoryRentRepository;
  }

  async memoryRent(
    user_id: number,
    rent_memory_user_id: number,
    boss_id: number,
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

    switch (memoryRentCount) {
      case 0:
        userMemoryRent.rent_memory_user_1 = rent_memory_user_id;
        userMemoryRent.rent_boss_1 = boss_id;
        break;
      case 1:
        userMemoryRent.rent_memory_user_2 = rent_memory_user_id;
        userMemoryRent.rent_boss_2 = boss_id;
        break;
      case 2:
        userMemoryRent.rent_memory_user_3 = rent_memory_user_id;
        userMemoryRent.rent_boss_3 = boss_id;
        break;
    }

    const updatedData = await userMemoryRentRepository.save(userMemoryRent);
    return updatedData;
  }

  async getFollowedUsersWithMemory(user_id: number, qr?: QueryRunner) {
    const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);

    const result = await userMemoryRentRepository
      .createQueryBuilder('um')
      .innerJoin(UserSnsFollow, 'usf', 'usf.follow_user_id = um.user_id')
      .where('usf.user_id = :currentUserId', { user_id })
      .andWhere('usf.follow_yn = :followYn', { followYn: 'Y' })
      .andWhere('um.memory != :memoryValue', { memoryValue: '0' })
      .select(['um.user_id', 'um.boss_id', 'um.memory'])
      .getMany();

    return result;
  }
}
