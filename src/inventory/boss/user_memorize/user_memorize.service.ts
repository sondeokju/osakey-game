import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMemorize } from './entities/user_memorize.entity';

@Injectable()
export class UserMemorizeService {
  constructor(
    @InjectRepository(UserMemorize)
    private readonly userMemorizeRepository: Repository<UserMemorize>,
  ) {}

  getUserMemorizeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMemorize>(UserMemorize)
      : this.userMemorizeRepository;
  }

  async getUserMemorize(user_id: string, qr?: QueryRunner) {
    const userMemorizeRepository = this.getUserMemorizeRepository(qr);
    const result = await userMemorizeRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
