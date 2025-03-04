import { Injectable } from '@nestjs/common';
import { CreateMissionRoutineBonusDto } from './dto/create-mission_routine_bonus.dto';
import { UpdateMissionRoutineBonusDto } from './dto/update-mission_routine_bonus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { MissionRoutineBonus } from './entities/mission_routine_bonus.entity';

@Injectable()
export class MissionRoutineBonusService {
  constructor(
    @InjectRepository(MissionRoutineBonus)
    private readonly missionRoutineBonusRepository: Repository<MissionRoutineBonus>,
  ) {}

  getMissionRoutineBonusRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<MissionRoutineBonus>(MissionRoutineBonus)
      : this.missionRoutineBonusRepository;
  }

  async getMissionRoutineBonusAll(qr?: QueryRunner) {
    const missionRoutineBonusRepository =
      this.getMissionRoutineBonusRepository(qr);
    const result = await missionRoutineBonusRepository.find({});
    return result;
  }

  async getMissionRoutineBonus(
    mission_kind: string,
    complete_count: number,
    qr?: QueryRunner,
  ) {
    const missionRoutineBonusRepository =
      this.getMissionRoutineBonusRepository(qr);
    const result = await missionRoutineBonusRepository.findOne({
      where: {
        mission_kind: mission_kind,
        complete_count,
      },
    });
    return result;
  }

  async getMissionRoutineBonusKind(mission_kind?: string, qr?: QueryRunner) {
    const missionRoutineBonusRepository =
      this.getMissionRoutineBonusRepository(qr);
    const query = missionRoutineBonusRepository.createQueryBuilder(
      'mission_routine_bonus',
    );

    if (mission_kind) {
      query.where('mission_routine_bonus.mission_kind = :mission_kind', {
        mission_kind,
      });
    } else {
      // mission_kind가 없으면 항상 false가 되도록 설정
      query.where('1 = 0');
    }

    return query.getMany();
  }

  // async getMissionRoutineBonusKind(mission_kind: string, qr?: QueryRunner) {
  //   const missionRoutineBonusRepository =
  //     this.getMissionRoutineBonusRepository(qr);
  //   const result = await missionRoutineBonusRepository.find({
  //     where: {
  //       mission_kind: mission_kind,
  //     },
  //   });
  //   return result;
  // }
}
