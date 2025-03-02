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

  async secameDiaryReward(user_id: string, qr?: QueryRunner) {
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
        where: { user_id },
        order: { mission_id: 'DESC' }, // 내림차순 정렬
      });

      if (!userSecameDiary) {
        throw new NotFoundException('UserSecameDiary not found');
      }

      // 🔹 3️⃣ 사용자 데이터 조회
      const userData = await this.usersService.getMe(user_id, qr);
      const currentSecameDiaryData =
        await this.secameDiaryService.getSecameDiary(
          userSecameDiary.mission_id,
        );
      const nextSecameDiaryId = userSecameDiary.mission_id + 1;

      const nextSecameDiaryData =
        await this.secameDiaryService.getSecameDiary(nextSecameDiaryId);

      const heroData = await this.heroService.getHeroRankByExp(
        userData.exp,
        qr,
      );

      // 🔹 4️⃣ 다음 다이어리 등록 로직
      let shouldInsertNextDiary = false;
      let isRepeatReward = false;

      console.log('nextSecameDiaryData:', nextSecameDiaryData);
      console.log(
        'currentSecameDiaryData.is_repeat:',
        currentSecameDiaryData.is_repeat.toLowerCase(),
      );
      console.log(
        'nextSecameDiaryData.hero_rank:',
        nextSecameDiaryData.hero_rank,
      );
      console.log('heroData.rank:', heroData.rank);
      console.log('userData.secame_credit:', userData.secame_credit);
      console.log(
        'nextSecameDiaryData.credit_goal_qty:',
        nextSecameDiaryData.credit_goal_qty,
      );

      if (
        nextSecameDiaryData &&
        ((currentSecameDiaryData.is_repeat.toLowerCase() === 'true' &&
          nextSecameDiaryData.hero_rank.trim() === heroData.rank.trim() &&
          userData.secame_credit >= nextSecameDiaryData.credit_goal_qty) ||
          (typeof currentSecameDiaryData.credit_goal_qty === 'number' &&
            !isNaN(userData.secame_credit) &&
            nextSecameDiaryData.hero_rank.trim() === heroData.rank.trim() &&
            userData.secame_credit >= currentSecameDiaryData.credit_goal_qty))
      ) {
        if (userSecameDiary.reward_yn === 'Y') {
          return {
            code: 0,
            message: `이미 세카메 다이어리 보상을 획득 했습니다.`,
            utcTimeString: new Date().toISOString(),
            hasError: false,
          };
        }

        shouldInsertNextDiary = true;
        isRepeatReward = true;
      }

      console.log('--------------------------------');
      console.log('shouldInsertNextDiary:', shouldInsertNextDiary);
      console.log('nextSecameDiaryData:', nextSecameDiaryData);
      console.log(
        'nextSecameDiaryData.is_repeat:',
        nextSecameDiaryData.is_repeat.toLowerCase(),
      );

      if (
        shouldInsertNextDiary &&
        nextSecameDiaryData &&
        nextSecameDiaryData.is_repeat.toLowerCase() !== 'true'
      ) {
        console.log('-------------insert-------------------');
        await userSecameDiaryRepository.insert({
          user_id,
          mission_id: nextSecameDiaryData.secame_diary_id,
        });
      }

      if (!nextSecameDiaryData) {
        if (currentSecameDiaryData.is_repeat.toLowerCase() === 'true') {
          isRepeatReward = true;
        }
      }
      let reward;
      let result;
      if (isRepeatReward) {
        // 🔹 5️⃣ 보상 지급
        reward = await this.rewardOfferService.reward(
          user_id,
          currentSecameDiaryData.reward_id,
          qr,
        );

        //세카메 크레딧 0으로 초기화
        await this.usersService.secamCreditReset(user_id, qr);

        // 🔹 6️⃣ `reward_yn` 업데이트
        userSecameDiary.reward_yn = 'Y';
        result = await userSecameDiaryRepository.save(userSecameDiary);
      }

      // 7️⃣ 트랜잭션 커밋
      if (!isExternalTransaction) {
        await qr.commitTransaction();
      }

      return {
        reward: {
          userItemData: reward,
        },
        user_secame_diary: result,
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
