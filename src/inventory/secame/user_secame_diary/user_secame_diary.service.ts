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

      // rank E->D->C->B->R
      const rankOrder = { E: 1, D: 2, C: 3, B: 4, R: 5 };
      // 현재 다이어리가 반복되는 경우인지 확인
      if (
        Boolean(currentSecameDiaryData.is_repeat) // true 이면 반복
      ) {
        // 반복 보상을 받을 수 있음
        isRepeatReward = true;
        if (
          rankOrder[heroData.rank] > rankOrder[nextSecameDiaryData.hero_rank]
        ) {
          // 새로운 다이어리 생성
          shouldInsertNextDiary = true;
        }
      } else if (
        userData.secame_credit >= currentSecameDiaryData.credit_goal_qty
      ) {
        // 새로운 다이어리 생성
        shouldInsertNextDiary = true;
        // 반복 및 일반 보상 지급
        isRepeatReward = true;
      }

      if (shouldInsertNextDiary && nextSecameDiaryData) {
        await userSecameDiaryRepository.insert({
          user_id,
          mission_id: nextSecameDiaryData.secame_diary_id,
        });
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

// if (
//   nextSecameDiaryData && // 다음 세카메 다이어리 데이터가 존재하는지 확인
//   ((currentSecameDiaryData.is_repeat.toLowerCase() === 'true' && // 현재 다이어리가 반복되는 경우인지 확인
//     nextSecameDiaryData.hero_rank >= heroData.rank && // 다음 다이어리의 영웅 랭크와 현재 사용자의 영웅 랭크가 동일한지 확인
//     userData.secame_credit >= currentSecameDiaryData.credit_goal_qty) || // 사용자의 세카메 크레딧이 다음 다이어리 목표 크레딧 이상인지 확인
//     (typeof currentSecameDiaryData.credit_goal_qty === 'number' && // 현재 다이어리의 목표 크레딧이 숫자인지 확인
//       !isNaN(userData.secame_credit) && // 사용자의 세카메 크레딧이 숫자인지 확인
//       nextSecameDiaryData.hero_rank >= heroData.rank && // 다음 다이어리의 영웅 랭크와 현재 사용자의 영웅 랭크가 동일한지 확인
//       userData.secame_credit >= currentSecameDiaryData.credit_goal_qty)) // 사용자의 세카메 크레딧이 현재 다이어리 목표 크레딧 이상인지 확인
// ) {
//   // 만약 이미 보상을 받은 경우
//   if (userSecameDiary.reward_yn === 'Y') {
//     return {
//       code: 0,
//       message: `이미 세카메 다이어리 보상을 획득 했습니다.`,
//       utcTimeString: new Date().toISOString(),
//       hasError: false,
//     };
//   }

//   // 다음 세카메 다이어리를 삽입해야 함
//   shouldInsertNextDiary = true;
//   // 반복 보상을 받을 수 있음
//   isRepeatReward = true;
// }
