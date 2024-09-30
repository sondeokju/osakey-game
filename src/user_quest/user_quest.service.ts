import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserQuest } from './entity/user_quest.entity';

@Injectable()
export class UserQuestService {
  //private readonly redisClient: Redis;

  constructor(
    @InjectRepository(UserQuest)
    private readonly userQuestRepository: Repository<UserQuest>,
  ) {}

  getUserQuestRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserQuest>(UserQuest)
      : this.userQuestRepository;
  }

  async getUserQuestAll(id: number, qr?: QueryRunner) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const result = await userQuestRepository.find({
      where: {
        id,
      },
    });
    return result;
  }
}
