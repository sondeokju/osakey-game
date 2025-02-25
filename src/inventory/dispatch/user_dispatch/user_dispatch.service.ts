import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserDispatch } from './entities/user_dispatch.entity';
import { DataSource } from 'typeorm';
import { MissionSubService } from 'src/static-table/mission_sub/mission_sub.service';
import { DispatchService } from 'src/static-table/dispatch/dispatch/dispatch.service';
import { DispatchConfigService } from 'src/static-table/dispatch/dispatch_config/dispatch_config.service';
import { DispatchEquipGradeService } from 'src/static-table/dispatch/dispatch_equip_grade/dispatch_equip_grade.service';
import { DispatchEquipLevelService } from 'src/static-table/dispatch/dispatch_equip_level/dispatch_equip_level.service';
import { DispatchRewardService } from 'src/static-table/dispatch/dispatch_reward/dispatch_reward.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { HeroService } from 'src/static-table/hero/hero.service';
import { UserDispatchRentamaService } from '../user_dispatch_rentama/user_dispatch_rentama.service';

@Injectable()
export class UserDispatchService {
  constructor(
    @InjectRepository(UserDispatch)
    private readonly userDispatchRepository: Repository<UserDispatch>,
    private readonly missionSubService: MissionSubService,
    private readonly dispatchService: DispatchService,
    private readonly dispatchConfigService: DispatchConfigService,
    private readonly dispatchEquipGradeService: DispatchEquipGradeService,
    private readonly dispatchEquipLevelService: DispatchEquipLevelService,
    private readonly dispatchRewardService: DispatchRewardService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly heroService: HeroService,
    private readonly userDispatchRentamaService: UserDispatchRentamaService,
    private readonly dataSource: DataSource,
  ) {}

  getUserDispatchRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserDispatch>(UserDispatch)
      : this.userDispatchRepository;
  }

  async getUserDispatch(user_id: string, qr?: QueryRunner) {
    const userDispatchRepository = this.getUserDispatchRepository(qr);
    const result = await userDispatchRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }

  async determineDispatchOutcome(
    user_id: string,
    mission_id: number,
    qr?: QueryRunner,
  ) {
    const userDispatchRepository = this.getUserDispatchRepository(qr);
    const userDispatch = await userDispatchRepository.findOne({
      where: {
        user_id,
        mission_id,
      },
    });

    let success;
    let greateSuccess;

    if (Math.random() <= userDispatch.dispatch_success_rate) {
      success = 'COMPLETED';
    } else {
      success = 'FAILED';
    }

    if (Math.random() <= userDispatch.dispatch_greate_success_rate) {
      greateSuccess = 'GREATCOMPLETED';
    } else {
      greateSuccess = 'FAILED';
    }

    if (success === 'COMPLETED' && greateSuccess === 'GREATCOMPLETED') {
      userDispatch.dispatch_status = greateSuccess;
    } else {
      userDispatch.dispatch_status = success;
    }

    const result = await userDispatchRepository.save(userDispatch);

    const missionSub = await this.missionSubService.getMissionSub(
      mission_id,
      qr,
    );

    // 성공 보상
    if (success === 'COMPLETED') {
      await this.rewardOfferService.reward(user_id, missionSub.reward_id, qr);
    }
    // 대성공 보상
    if (greateSuccess === 'GREATCOMPLETED') {
      const greateReward = await this.greateReward(
        user_id,
        missionSub.mission_rank,
      );
    }

    return {
      reward: {
        userItemData: {},
      },
      //userShopLimit,
      //deductedCurrency,
    };
  }

  //파견 상태 (IN_PROGRESS, COMPLETED, FAILED, GREAT COMPLETED)
  async dispatchRentama(user_id: string, mission_id: number, qr?: QueryRunner) {
    const userDispatchRepository = this.getUserDispatchRepository(qr);
    let userDispatch = await userDispatchRepository.findOne({
      where: { user_id, mission_id },
    });

    const missionSub = await this.missionSubService.getMissionSub(
      mission_id,
      qr,
    );

    const userDispatchRentama =
      await this.userDispatchRentamaService.getUserDispatchRentama(user_id, qr);

    const rentamaRank = await this.heroService.getHeroLevel(
      userDispatchRentama.rentama_level,
      qr,
    );

    const dispatchTimeHour = await this.defaultDispatchTime(
      rentamaRank.rank, //dispatch_rank,
      missionSub.mission_rank, //mission_rank,
    );

    const dispatchEndDate = new Date(
      Date.now() + dispatchTimeHour * 60 * 60 * 1000,
    );

    const successRate = await this.calcuSuccessRate(
      rentamaRank.rank, //dispatch_rank,
      missionSub.mission_rank, //mission_rank,
      [], //equip_grade,
      [], //equip_level,
      qr,
    );

    const greateSuccessRate = await this.calcuGreateSuccessRate(
      rentamaRank.rank, //dispatch_rank,
      //missionSub.mission_rank, //mission_rank,
      [], //equip_grade,
      [], //equip_level,
    );

    if (!userDispatch) {
      userDispatch = userDispatchRepository.create({
        user_id,
        mission_id,
        dispatch_start_date: new Date(),
        dispatch_end_date: dispatchEndDate,
        dispatch_success_rate: successRate,
        dispatch_greate_success_rate: greateSuccessRate,
        dispatch_status: 'IN_PROGRESS',
        dispatch_unlock: 'Y',
      });
    }

    // 생성 혹은 업데이트된 객체를 저장합니다.
    const result = await userDispatchRepository.save(userDispatch);

    return result;
  }

  async calcuSuccessRate(
    dispatch_rank: string,
    mission_rank: string,
    equip_grade: string[],
    equip_level: number[],
    qr?: QueryRunner,
  ) {
    let finalRate = 0;

    const baseRate = await this.defaultDispatchRate(
      dispatch_rank,
      mission_rank,
    );

    const equipGradeRate = await this.calcuEquipGradeSuccessRate(
      equip_grade,
      qr,
    );

    const equipLevelRate = await this.calcuEquipLevelSuccessRate(
      equip_level,
      qr,
    );

    finalRate = baseRate + equipGradeRate + equipLevelRate;

    // 최종 성공률이 음수이면 0을 반환합니다.
    return finalRate < 0 ? 0 : finalRate;
  }

  async calcuGreateSuccessRate(
    dispatch_rank: string,
    //mission_rank: string,
    equip_grade: string[],
    equip_level: number[],
    qr?: QueryRunner,
  ) {
    let finalRate = 0;

    // const baseRate = await this.defaultDispatchRate(
    //   dispatch_rank,
    //   mission_rank,
    // );

    const dispatchGreateRate = await this.dispatchService.getDispatchGreateRate(
      dispatch_rank,
      qr,
    );
    const equipGradeRate = await this.calcuEquipGradeSuccessRate(
      equip_grade,
      qr,
    );

    const equipLevelRate = await this.calcuEquipLevelSuccessRate(
      equip_level,
      qr,
    );

    finalRate =
      dispatchGreateRate.great_success_rate + equipGradeRate + equipLevelRate;

    // 최종 성공률이 음수이면 0을 반환합니다.
    return finalRate < 0 ? 0 : finalRate;
  }

  async calcuEquipGradeSuccessRate(equip_grade: string[], qr?: QueryRunner) {
    // 각 등급에서 add_success_rate 값을 누적합니다.
    let totalAddSuccessRate = 0;
    for (const grade of equip_grade) {
      const equipGrade =
        await this.dispatchEquipGradeService.getDispatchEquipGrade(grade, qr);
      totalAddSuccessRate += equipGrade.add_success_rate;
    }

    // 기본 성공률에 추가 성공률을 더해 최종 성공률을 계산합니다.
    const finalRate = totalAddSuccessRate;

    // 최종 성공률이 음수이면 0을 반환합니다.
    return finalRate < 0 ? 0 : finalRate;
  }

  async calcuEquipLevelSuccessRate(equip_level: number[], qr?: QueryRunner) {
    // 각 등급에서 add_success_rate 값을 누적합니다.
    let totalAddSuccessRate = 0;
    for (const level of equip_level) {
      const equipLevel =
        await this.dispatchEquipLevelService.getDispatchEquipLevel(level, qr);
      totalAddSuccessRate += equipLevel.add_success_rate;
    }

    // 기본 성공률에 추가 성공률을 더해 최종 성공률을 계산합니다.
    const finalRate = totalAddSuccessRate;

    // 최종 성공률이 음수이면 0을 반환합니다.
    return finalRate < 0 ? 0 : finalRate;
  }

  //E->D->C->B->A-R
  async defaultDispatchTime(dispatch_grade: string, mission_grade: string) {
    // 등급 순서를 낮은 등급부터 높은 등급으로 배열에 정의합니다.
    const grades = ['E', 'D', 'C', 'B', 'A', 'R'];

    const DISPATCH_DEFAULT_SUCCESS_TIME =
      await this.dispatchConfigService.getDispatchConfig(
        'DISPATCH_DEFAULT_SUCCESS_TIME',
      );

    const DISPATCH_LOWER_SUCCESS_TIME =
      await this.dispatchConfigService.getDispatchConfig(
        'DISPATCH_LOWER_SUCCESS_TIME',
      );

    const DISPATCH_HIGHER_SUCCESS_TIME =
      await this.dispatchConfigService.getDispatchConfig(
        'DISPATCH_HIGHER_SUCCESS_TIME',
      );

    // 각 등급의 인덱스를 가져옵니다.
    const dispatchIndex = grades.indexOf(dispatch_grade);
    const missionIndex = grades.indexOf(mission_grade);

    // 기본 파견 시간 60시간
    let option = +DISPATCH_DEFAULT_SUCCESS_TIME.option;

    // 파견 등급이 미션카드 난이도보다 낮은 경우 (예: dispatch가 D, mission이 B)
    // 미션카드 난이도와의 차이만큼 30초씩 파견 시간이 늘어납니다.
    if (dispatchIndex < missionIndex) {
      option +=
        (missionIndex - dispatchIndex) * +DISPATCH_LOWER_SUCCESS_TIME.option;
    }
    // 파견 등급이 미션카드 난이도보다 높은 경우 (예: dispatch가 A, mission이 C)
    // 차이만큼 30초씩 파견 시간이 줄어듭니다.
    else if (dispatchIndex > missionIndex) {
      option -=
        (dispatchIndex - missionIndex) * +DISPATCH_HIGHER_SUCCESS_TIME.option;
    }

    return option < 0 ? 0 : option;
  }

  async defaultDispatchRate(dispatch_grade: string, mission_grade: string) {
    // 등급 순서를 낮은 등급부터 높은 등급으로 배열에 정의합니다.
    const grades = ['E', 'D', 'C', 'B', 'A', 'R'];

    const DISPATCH_DEFAULT_SUCCESS_PER =
      await this.dispatchConfigService.getDispatchConfig(
        'DISPATCH_DEFAULT_SUCCESS_PER',
      );

    const DISPATCH_LOWER_SUCCESS_PER =
      await this.dispatchConfigService.getDispatchConfig(
        'DISPATCH_LOWER_SUCCESS_PER',
      );

    const DISPATCH_HIGHER_SUCCESS_PER =
      await this.dispatchConfigService.getDispatchConfig(
        'DISPATCH_HIGHER_SUCCESS_PER',
      );

    // 각 등급의 인덱스를 가져옵니다.
    const dispatchIndex = grades.indexOf(dispatch_grade);
    const missionIndex = grades.indexOf(mission_grade);

    // 기본 성공 확률
    let option = +DISPATCH_DEFAULT_SUCCESS_PER.option;

    // 파견 등급이 미션카드 난이도보다 낮은 경우,
    // 1단계 차이마다 성공 확률을 감소시킵니다.
    if (dispatchIndex < missionIndex) {
      option -=
        (missionIndex - dispatchIndex) * +DISPATCH_LOWER_SUCCESS_PER.option;
    }
    // 파견 등급이 미션카드 난이도보다 높은 경우,
    // 1단계 차이마다 성공 확률을 상승시킵니다.
    else if (dispatchIndex > missionIndex) {
      option +=
        (dispatchIndex - missionIndex) * +DISPATCH_HIGHER_SUCCESS_PER.option;
    }

    return option < 0 ? 0 : option;
  }

  async selectItemIdByMissionRank(mission_rank: string, qr?: QueryRunner) {
    const rewards = await this.dispatchRewardService.getDispatchReward(
      mission_rank,
      qr,
    );

    if (!rewards.length) {
      throw new Error(
        `mission_rank ${mission_rank} 에 해당하는 보상이 존재하지 않습니다.`,
      );
    }

    // reward_rate의 총합을 계산합니다.
    const totalWeight = rewards.reduce(
      (sum, reward) => sum + reward.reward_rate,
      0,
    );

    // 0과 totalWeight 사이의 난수를 생성합니다.
    const random = Math.random() * totalWeight;

    // 각 보상의 누적 가중치를 계산하며 random 값과 비교합니다.
    let cumulativeWeight = 0;
    for (const reward of rewards) {
      cumulativeWeight += reward.reward_rate;
      if (random < cumulativeWeight) {
        return { item_id: reward.item_id, item_count: reward.item_count };
      }
    }

    // 예외 상황에 대비하여 마지막 항목의 값을 반환합니다.
    const lastReward = rewards[rewards.length - 1];
    return { item_id: lastReward.item_id, item_count: lastReward.item_count };
  }

  async greateReward(user_id: string, mission_rank: string, qr?: QueryRunner) {
    const reward = await this.selectItemIdByMissionRank(mission_rank, qr);
    const result = await this.rewardOfferService.rewardItem(
      user_id,
      reward.item_id,
      reward.item_count,
    );

    return reward;
  }

  async getDispatchEquipGradeRate(
    equip_grade: string,
    equip_level: number,
    qr?: QueryRunner,
  ) {
    const gradeRate =
      await this.dispatchEquipGradeService.getDispatchEquipGrade(
        equip_grade,
        qr,
      );
    const levelRate =
      await this.dispatchEquipLevelService.getDispatchEquipLevel(
        equip_level,
        qr,
      );

    return {
      equip_grade_rate: gradeRate,
      equip_level_rate: levelRate,
    };
  }

  async dispatchUnlock(user_id: string, qr?: QueryRunner) {
    await this.dataSource.query(
      `UPDATE user_dispatch
    SET dispatch_unlocked = 'Y'
    WHERE user_id = ?`,
      [user_id],
    );
  }
}
