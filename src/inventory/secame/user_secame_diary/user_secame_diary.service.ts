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
import { UsersService } from 'src/users/users.service';
import { HeroService } from 'src/static-table/hero/hero.service';

@Injectable()
export class UserSecameDiaryService {
  constructor(
    @InjectRepository(UserSecameDiary)
    private readonly userSecameDiaryRepository: Repository<UserSecameDiary>,
    private readonly secameDiaryService: SecameDiaryService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly usersService: UsersService,
    private readonly heroService: HeroService,
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

    // 1️⃣ 트랜잭션 시작
    const isExternalTransaction = !!qr;
    if (!isExternalTransaction) {
      qr = userSecameDiaryRepository.manager.connection.createQueryRunner();
      await qr.startTransaction();
    }

    try {
      // 🔹 2️⃣ 현재 다이어리 조회
      const userSecameDiary = await userSecameDiaryRepository.findOne({
        where: { id: user_secame_diary_id, user_id },
      });

      if (!userSecameDiary) {
        throw new NotFoundException('UserSecameDiary not found');
      }

      // if (userSecameDiary.reward_yn === 'Y') {
      //   return {
      //     message: 'You have already claimed the reward.',
      //   };
      // }

      // 🔹 3️⃣ 사용자 데이터 조회
      const userData = await this.usersService.getMe(user_id, qr);
      const currentSecameDiaryData =
        await this.secameDiaryService.getSecameDiary(
          userSecameDiary.mission_id,
        );
      const nextSecameDiaryId = userSecameDiary.mission_id + 1;
      console.log('nextSecameDiaryId:', nextSecameDiaryId);
      const nextSecameDiaryData =
        await this.secameDiaryService.getSecameDiary(nextSecameDiaryId);
      console.log('nextSecameDiaryData:', nextSecameDiaryData);

      const heroData = await this.heroService.getHeroLevel(userData.level, qr);

      // 🔹 4️⃣ 다음 다이어리 등록 로직 (한 번만 실행)
      let shouldInsertNextDiary = false;

      if (
        currentSecameDiaryData.is_repeat === 'TRUE' &&
        nextSecameDiaryData &&
        nextSecameDiaryData.hero_rank === heroData.rank &&
        userData.secame_credit >= nextSecameDiaryData.credit_goal_qty
      ) {
        shouldInsertNextDiary = true;
      }

      console.log(
        'shouldInsertNextDiary :',
        nextSecameDiaryData,
        userData.secame_credit,
      );

      console.log(
        'nextSecameDiaryData.credit_goal_qty:',
        typeof nextSecameDiaryData.credit_goal_qty,
      );

      console.log('userData.secame_credit:', typeof userData.secame_credit);
      if (
        nextSecameDiaryData &&
        //currentSecameDiaryData.is_repeat === 'FALSE' &&
        userData.secame_credit >= currentSecameDiaryData.credit_goal_qty
      ) {
        console.log('shouldInsertNextDiary : true');
        shouldInsertNextDiary = true;
      }

      if (shouldInsertNextDiary) {
        await userSecameDiaryRepository.insert({
          user_id,
          mission_id: nextSecameDiaryData.secame_diary_id,
        });
      }

      // 🔹 5️⃣ 보상 지급
      const reward = await this.rewardOfferService.reward(
        user_id,
        currentSecameDiaryData.reward_id,
      );

      // 🔹 6️⃣ `reward_yn` 업데이트.
      userSecameDiary.reward_yn = 'Y';
      const result = await userSecameDiaryRepository.save(userSecameDiary);

      // 7️⃣ 트랜잭션 커밋
      if (!isExternalTransaction) {
        await qr.commitTransaction();
      }

      return {
        user_secame_diary: result,
        reward,
      };
    } catch (error) {
      if (!isExternalTransaction) {
        await qr.rollbackTransaction();
      }
      throw error;
    } finally {
      if (!isExternalTransaction) {
        await qr.release();
      }
    }
  }
}
