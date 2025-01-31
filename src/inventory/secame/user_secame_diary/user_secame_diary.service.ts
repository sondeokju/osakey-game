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
import { SecameDiaryService } from 'src/static-table/secame/secame_diary/secame_diary.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Injectable()
export class UserSecameDiaryService {
  constructor(
    @InjectRepository(UserSecameDiary)
    private readonly userSecameDiaryRepository: Repository<UserSecameDiary>,
    private readonly secameDiaryService: SecameDiaryService,
    private readonly rewardOfferService: RewardOfferService,
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
      throw new NotFoundException('UserSecameDiary not found');
    }

    if (userSecameDiary.reward_yn === 'Y') {
      return {
        message: 'You have already claimed the reward.',
      };
    }

    const secameDiary = await this.secameDiaryService.getSecameDiary(
      userSecameDiary.mission_id,
      qr,
    );

    const reward = await this.rewardOfferService.reward(
      user_id,
      secameDiary.reward_id,
    );

    userSecameDiary.reward_yn = 'Y';
    const result = await userSecameDiaryRepository.save(userSecameDiary);

    return {
      user_secame_diary: result,
      reward,
    };
  }
}
