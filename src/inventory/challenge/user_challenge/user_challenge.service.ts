import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { DataSource } from 'typeorm';
import { UserChallenge } from './entities/user_challenge.entity';
import { MissionRoutineBonusService } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.service';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
import { MissionRoutine } from 'src/static-table/mission_routine/entities/mission_routine.entity';
import { UserChallengeExtraService } from '../user_challenge_extra/user_challenge_extra.service';

@Injectable()
export class UserChallengeService {
  constructor(
    @InjectRepository(UserChallenge)
    private readonly userChallengeRepository: Repository<UserChallenge>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly missionRoutineBonusService: MissionRoutineBonusService,
    private readonly missionRoutineService: MissionRoutineService,
    private readonly userChallengeExtraService: UserChallengeExtraService,
    private readonly dataSource: DataSource,
  ) {}

  getUserChallengeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserChallenge>(UserChallenge)
      : this.userChallengeRepository;
  }

  async getUserChallengeAll(user_id: string, qr?: QueryRunner) {
    const userChallengeRepository = this.getUserChallengeRepository(qr);

    const userChallenge = await userChallengeRepository.find({
      where: { user_id },
    });

    return userChallenge;
  }

  async challengeQuest(
    user_id: string,
    mission_routine_id: number,
    count: number,
    qr?: QueryRunner,
  ) {
    const userChallengeRepository = this.getUserChallengeRepository(qr);

    let userChallenge = await userChallengeRepository.findOne({
      where: { user_id, mission_routine_id },
    });

    const missionRoutine = await this.missionRoutineService.getMissionRoutine(
      mission_routine_id,
      qr,
    );

    if (!userChallenge) {
      userChallenge = userChallengeRepository.create({
        user_id,
        mission_routine_id,
        mission_kind: missionRoutine.mission_kind,
        mission_goal: count, // 처음부터 count 값을 설정
      });

      userChallenge = await userChallengeRepository.save(userChallenge);
    } else {
      await userChallengeRepository.increment(
        { user_id, mission_routine_id },
        'mission_goal',
        count,
      );

      userChallenge = await userChallengeRepository.findOne({
        where: { user_id, mission_routine_id },
      });
    }

    return userChallenge;
  }

  async challengeQuestReward(
    user_id: string,
    mission_routine_id: number,
    qr?: QueryRunner,
  ) {
    const userChallengeRepository = this.getUserChallengeRepository(qr);
    const userChallenge = await userChallengeRepository.findOne({
      where: { user_id, mission_routine_id },
    });

    if (userChallenge.reward_yn === 'Y') {
      return {
        code: 0,
        message: `${mission_routine_id} The reward has already been claimed.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }
    const missionRoutine = await this.missionRoutineService.getMissionRoutine(
      mission_routine_id,
      qr,
    );

    let rewardData;
    if (userChallenge.mission_goal >= missionRoutine.mission_goal) {
      rewardData = await this.rewardOfferService.reward(
        user_id,
        missionRoutine.reward_id,
        qr,
      );
      userChallenge.reward_yn = 'Y';
    }

    const result = await userChallengeRepository.save(userChallenge);

    return {
      reward: {
        userItemData: rewardData,
      },
      userChallenge: result,
    };
  }

  async challengeQuestextraReward(
    user_id: string,
    mission_kind: string,
    qr?: QueryRunner,
  ) {
    const userChallengeRepository = this.getUserChallengeRepository(qr);

    const completeCount = await this.getCompletedMissionCountPerRoutine(
      user_id,
      qr,
    );

    // 추가 보상을 받을 수 있는 기준 리스트 가져오기
    const missionBonusList =
      await this.missionRoutineBonusService.getMissionRoutineBonusKind(
        mission_kind,
        qr,
      );

    // 유저가 받을 수 있는 추가 보상 목록 필터링
    const eligibleBonuses = missionBonusList.filter(
      (bonus) => bonus.complete_count <= completeCount,
    );

    if (eligibleBonuses.length === 0) {
      return {
        code: 0,
        message: `mission_kind: ${mission_kind}, complete_count: ${completeCount} 추가 보상을 받을 조건이 충족되지 않았습니다.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    const rewards = [];

    for (const bonus of eligibleBonuses) {
      // 추가 보상이 이미 지급된 적 있는지 확인
      const extraRewardExists =
        await this.userChallengeExtraService.getUserChallengeExtra(
          user_id,
          mission_kind,
          bonus.complete_count,
          qr,
        );

      if (!extraRewardExists) {
        const rewardData = await this.rewardOfferService.reward(
          user_id,
          bonus.reward_id,
          qr,
        );
        console.log('------------rewardData:', rewardData);

        await this.userChallengeExtraService.challengeExtraRewardCheck(
          user_id,
          mission_kind,
          bonus.complete_count,
        );

        // rewardData가 배열이므로 각 요소에 대해 처리
        rewardData.forEach((reward) => {
          const existingReward = rewards.find(
            (r) => r.item_id === reward.item_id,
          );

          if (existingReward) {
            existingReward.item_count += reward.item_count;
          } else {
            rewards.push({
              item_id: reward.item_id,
              item_count: reward.item_count,
            });
          }
        });
      }
    }

    const result = await userChallengeRepository.find({ where: { user_id } });

    return {
      reward: {
        userItemData: rewards,
      },
      userChallenge: result,
    };
  }

  // async challengeQuestextraReward(
  //   user_id: string,
  //   mission_kind: string,
  //   qr?: QueryRunner,
  // ) {
  //   const userChallengeRepository = this.getUserChallengeRepository(qr);

  //   // const missionKindList =
  //   //   await this.missionRoutineBonusService.getMissionRoutineBonusKind(
  //   //     'MD',
  //   //     qr,
  //   //   );

  //   // for (const mission of missionKindList) {
  //   //   mission.complete_count
  //   // }

  //   const completeCount = await this.getCompletedMissionCountPerRoutine(
  //     user_id,
  //     qr,
  //   );

  //   // const extraReward =
  //   //   await this.userChallengeExtraService.getUserChallengeExtra(
  //   //     user_id,
  //   //     mission_kind,
  //   //     completeCount,
  //   //     qr,
  //   //   );

  //   // if (!extraReward) {
  //   //   return {
  //   //     code: 0,
  //   //     message: `mission_kind: ${mission_kind}, complete_count: ${completeCount} 추가 미션완료 조건이 맞지 않습니다. `,
  //   //     utcTimeString: new Date().toISOString(),
  //   //     hasError: false,
  //   //   };
  //   // }

  //   const missionRoutineBonus =
  //     await this.missionRoutineBonusService.getMissionRoutineBonus(
  //       mission_kind,
  //       completeCount,
  //     );

  //   if (!missionRoutineBonus) {
  //     return {
  //       code: 0,
  //       message: `mission_kind: ${mission_kind}, complete_count: ${completeCount} missionRoutineBonus 테이블에 정보가 없습니다.`,
  //       utcTimeString: new Date().toISOString(),
  //       hasError: false,
  //     };
  //   }

  //   const rewardData = await this.rewardOfferService.reward(
  //     user_id,
  //     missionRoutineBonus.reward_id,
  //     qr,
  //   );

  //   await this.userChallengeExtraService.challengeExtraRewardCheck(
  //     user_id,
  //     mission_kind,
  //     completeCount,
  //   );

  //   const result = await userChallengeRepository.find({
  //     where: { user_id },
  //   });

  //   return {
  //     reward: {
  //       userItemData: rewardData,
  //     },
  //     userChallenge: result,
  //   };
  // }

  async getCompletedMissionCountPerRoutine(user_id: string, qr?: QueryRunner) {
    const userChallengeRepository = this.getUserChallengeRepository(qr);

    const userChallenges = await userChallengeRepository.find({
      where: { user_id },
      select: ['mission_routine_id', 'mission_goal', 'mission_kind'],
    });

    console.log('userChallenges:', userChallenges);
    let completedCounts = 0;

    // 각 userChallenge의 mission_routine_id 기준으로 반복
    for (const challenge of userChallenges) {
      const { mission_routine_id, mission_goal } = challenge;

      // mission_routine_id에 해당하는 mission_goal 값 가져오기
      const missionRoutine = await this.missionRoutineService.getMissionRoutine(
        mission_routine_id,
        qr,
      );

      if (!missionRoutine) continue; // 해당 mission_routine이 없으면 넘어감

      // 유저의 mission_goal이 missionRoutine의 mission_goal보다 크면 카운트 증가
      if (mission_goal >= missionRoutine.mission_goal) {
        completedCounts += 1;
      }
    }

    return completedCounts;
  }

  // async getCompletedMissionRoutineCount(
  //   user_id: string,
  //   qr?: QueryRunner,
  // ): Promise<number> {
  //   const userChallengeRepository = this.getUserChallengeRepository(qr);

  //   const completedMissionCount = await userChallengeRepository
  //     .createQueryBuilder('uc')
  //     .innerJoin(
  //       'mission_routine',
  //       'mr',
  //       'uc.mission_kind = mr.mission_kind AND uc.mission_goal > mr.mission_goal',
  //     )
  //     .where('uc.user_id = :user_id', { user_id })
  //     .getCount();

  //   return completedMissionCount;
  // }
}
