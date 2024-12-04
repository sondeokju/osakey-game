import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemoryRent } from './entities/user_memory_rent.entity';
import { UserMemoryService } from '../user_memory/user_memory.service';

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
    return updatedData;
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

    return userMemoryRent;
  }

  async rentMemoryClear(user_id: number, slot: number, qr?: QueryRunner) {
    const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);
    const userMemoryRent = await userMemoryRentRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userMemoryRent) {
      throw new NotFoundException('memory slot not found');
    }

    switch (+slot) {
      case 1:
        userMemoryRent.rent_memory_user_1 = 0;
        userMemoryRent.rent_boss_1 = 0;
        break;
      case 2:
        userMemoryRent.rent_memory_user_2 = 0;
        userMemoryRent.rent_boss_2 = 0;
        break;
      case 3:
        userMemoryRent.rent_memory_user_3 = 0;
        userMemoryRent.rent_boss_3 = 0;
        break;
    }

    await userMemoryRentRepository.save({
      ...userMemoryRent,
    });

    const result = await userMemoryRentRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
  }
}
