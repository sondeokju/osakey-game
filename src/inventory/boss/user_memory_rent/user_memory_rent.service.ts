import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemoryRent } from './entities/user_memory_rent.entity';

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

  // async memoryAdd(user_id: number, boss_id: number, qr?: QueryRunner) {
  //   const userMemoryRentRepository = this.getUserMemoryRentRepository(qr);
  //   const userMemoryRent = await userMemoryRentRepository.findOne({
  //     where: {
  //       user_id,
  //       boss_id,
  //     },
  //   });

  //   if (!userMemory) {
  //     throw new NotFoundException('boss memory data not found');
  //   }

  //   await userMemoryRepository.increment({ user_id, boss_id }, 'memory', 1);

  //   const updateData = await userMemoryRepository.findOne({
  //     where: {
  //       user_id,
  //       boss_id,
  //     },
  //   });

  //   return updateData;
  // }
}
