import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemoryShare } from './entities/user_memory_share.entity';

@Injectable()
export class UserMemoryShareService {
  constructor(
    @InjectRepository(UserMemoryShare)
    private readonly userMemoryShareRepository: Repository<UserMemoryShare>,
  ) {}

  getUserMemorizeShareRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMemoryShare>(UserMemoryShare)
      : this.userMemoryShareRepository;
  }

  async getUserMemorizeShare(user_id: string, qr?: QueryRunner) {
    const userMemoryShareRepository = this.getUserMemorizeShareRepository(qr);
    const result = await userMemoryShareRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
