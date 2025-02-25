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

  //파견 상태 (IN_PROGRESS, COMPLETED, FAILED, GREAT COMPLETED)
  async dispatchRentama(user_id: string, mission_id: number, qr?: QueryRunner) {
    const userDispatchRepository = this.getUserDispatchRepository(qr);
    let userDispatch = await userDispatchRepository.findOne({
      where: { user_id, mission_id },
    });

    if (!userDispatch) {
      userDispatch = userDispatchRepository.create({
        user_id,
        mission_id,
        dispatch_start_date: new Date(),
        dispatch_status: 'IN_PROGRESS',
      });
    } else {
      userDispatch.mission_id = mission_id;
    }

    // 생성 혹은 업데이트된 객체를 저장합니다.
    const result = await userDispatchRepository.save(userDispatch);

    return result;
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

    return option;
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

    return option;
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
