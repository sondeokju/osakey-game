import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
import { MissionService } from 'src/static-table/mission/mission.service';
import { MissionKindService } from 'src/static-table/mission_kind/mission_kind.service';
import { MissionMainService } from 'src/static-table/mission_main/mission_main.service';
import { MissionRoutineBonusService } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.service';
import { MissionSubService } from 'src/static-table/mission_sub/mission_sub.service';
import { RewardService } from 'src/static-table/reward/reward.service';

@Injectable()
export class UserQuestService {
  constructor(
    @InjectRepository(UserQuest)
    private readonly userQuestRepository: Repository<UserQuest>,
    private readonly missionService: MissionService,
    private readonly missionKindService: MissionKindService,
    private readonly missionMainService: MissionMainService,
    private readonly missionRoutineService: MissionRoutineService,
    private readonly missionRoutineBonusService: MissionRoutineBonusService,
    private readonly missionSubService: MissionSubService,
    private readonly rewardService: RewardService,
  ) {}

  getUserQuestRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserQuest>(UserQuest)
      : this.userQuestRepository;
  }

  //   getUsersRepository(qr?: QueryRunner) {
  //     return qr
  //       ? qr.manager.getRepository<Users>(Users)
  //       : this.usersRepository;
  //   }

  async getMissionAll(qr?: QueryRunner) {
    const obj = {
      mission: await this.missionService.getMissionAll(qr),
      mission_kind: await this.missionKindService.getMissionKindAll(qr),
      mission_main: await this.missionMainService.getMissionMainAll(qr),

      mission_routine:
        await this.missionRoutineService.getMissionRoutineAll(qr),

      mission_routine_bonus:
        await this.missionRoutineBonusService.getMissionRoutineBonusAll(qr),

      mission_sub: await this.missionSubService.getMissionSubAll(qr),
    };

    return obj;
  }

  async getUserQuestAll(user_id: number, qr?: QueryRunner) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const result = await userQuestRepository.find({
      where: {
        user_id,
      },
    });
    console.log(result);
    console.log(user_id);

    return result;
  }

  async questDayWeekReward(
    user_id: number,
    user_quest_id: number,
    qr?: QueryRunner,
  ) {
    console.log('user_id:', user_id);
    console.log('user_quest_id:', user_quest_id);

    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });
    console.log('userQuestData:', userQuestData);

    const missionRoutineData =
      await this.missionRoutineService.getMissionRoutine(
        userQuestData.progress_mission_id,
      );

    console.log('missionRoutineData.reward_id', missionRoutineData.reward_id);
    const rewardData = await this.rewardService.reward(
      user_id,
      missionRoutineData.reward_id,
    );

    await userQuestRepository.save({
      ...userQuestData,
      mission_complete_yn: 'Y',
      reward_yn: 'Y',
    });

    return rewardData;
  }

  async questMainReward(
    user_id: number,
    user_quest_id: number,
    qr?: QueryRunner,
  ) {
    console.log('user_id:', user_id);
    console.log('user_quest_id:', user_quest_id);

    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });
    console.log('userQuestData:', userQuestData);

    const missionMainData = await this.missionMainService.getMissionMain(
      userQuestData.progress_mission_id,
    );

    console.log('missionMainData.reward_id', missionMainData.reward_id);
    const rewardData = await this.rewardService.reward(
      user_id,
      missionMainData.reward_id,
    );

    await userQuestRepository.save({
      ...userQuestData,
      mission_complete_yn: 'Y',
      reward_yn: 'Y',
    });

    return rewardData;
  }

  async questSubReward(
    user_id: number,
    user_quest_id: number,
    qr?: QueryRunner,
  ) {
    const MISSION_LEVEL_ZERO = 0;
    const MISSION_LEVEL_MAX = 5;

    console.log('user_id:', user_id);
    console.log('user_quest_id:', user_quest_id);

    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });
    console.log('userQuestData:', userQuestData);

    const missionSubData = await this.missionSubService.getMissionSub(
      userQuestData.progress_mission_id,
    );

    console.log('missionSubData:', missionSubData);

    console.log('missionRoutineData.reward_id', missionSubData.reward_id);
    const rewardData = await this.rewardService.reward(
      user_id,
      missionSubData.reward_id,
    );

    await userQuestRepository.save({
      ...userQuestData,
      mission_complete_yn: 'Y',
      reward_yn: 'Y',
    });

    console.log('missionSubData.mission_level:', missionSubData.mission_level);
    const nextNpcMissionSubID = {};

    // 미션 레벨이 0일 경우
    if (missionSubData.mission_level === MISSION_LEVEL_ZERO) {
      nextNpcMissionSubID['next_mission_sub_id'] =
        missionSubData.mission_sub_id;
    } else {
      // 다음 레벨 계산
      const nextLevel =
        missionSubData.mission_level === MISSION_LEVEL_MAX
          ? MISSION_LEVEL_ZERO
          : missionSubData.mission_level + 1;

      try {
        // 다음 미션 서브 ID 가져오기
        const missionNextLevelData =
          await this.missionSubService.getMissionSubNextLevel(
            missionSubData.npc,
            nextLevel,
          );
        nextNpcMissionSubID['next_mission_sub_id'] =
          missionNextLevelData.mission_sub_id;
      } catch (error) {
        console.error('다음 미션 서브 ID를 가져오는 데 실패했습니다:', error);
        // 에러 처리 (예: 기본값 설정, 사용자에게 알리기 등)
      }
    }

    return {
      rewardData,
      ...nextNpcMissionSubID,
    };
  }

  // async getUserQuestTypeList(
  //   user_id: number,
  //   mission_type: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const result = await userQuestRepository.find({
  //     where: {
  //       user_id,
  //       mission_type,
  //     },
  //   });
  //   return result;
  // }
}
