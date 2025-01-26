import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSecameDiary } from './entities/user_secame_diary.entity';

@Injectable()
export class UserSecameDiaryService {
  constructor(
    @InjectRepository(UserSecameDiary)
    private readonly userSecameDiaryRepository: Repository<UserSecameDiary>,
  ) {}

  getUserSecameDiaryRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSecameDiary>(UserSecameDiary)
      : this.userSecameDiaryRepository;
  }

  async getUserSecameDiary(user_id: string, qr?: QueryRunner) {
    const userSecameDiaryRepository = this.getUserSecameDiaryRepository(qr);
    const result = await userSecameDiaryRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
