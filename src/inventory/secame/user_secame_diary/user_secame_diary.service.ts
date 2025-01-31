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

  async secameDiaryAdd(user_id: string, mission_id: number, qr?: QueryRunner) {
    const userSecameDiaryRepository = this.getUserSecameDiaryRepository(qr);

    const newDiary = userSecameDiaryRepository.create({
      user_id,
      mission_id: +mission_id,
      reward_yn: 'N',
      diary_reward_date: new Date(),
    });

    const result = await userSecameDiaryRepository.save(newDiary);

    return result;
  }

  async secameDiaryReward(
    user_id: string,
    user_secame_diary_id: number,
    qr?: QueryRunner,
  ) {
    const userSecameDiaryRepository = this.getUserSecameDiaryRepository(qr);
    const userSecameDiary = await userSecameDiaryRepository.findOne({
      where: { id: user_secame_diary_id, user_id },
    });

    if (!userSecameDiary) {
      throw new NotFoundException('UserSecameMail not found');
    }

    userSecameDiary.reward_yn = 'Y';
    const result = await userSecameDiaryRepository.save(userSecameDiary);

    return result;
  }
}
