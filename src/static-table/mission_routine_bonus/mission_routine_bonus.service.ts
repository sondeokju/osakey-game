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

  async getMissionRoutineBonusKind(mission_kind: string, qr?: QueryRunner) {
    const missionRoutineBonusRepository =
      this.getMissionRoutineBonusRepository(qr);
    const result = await missionRoutineBonusRepository.find({
      where: {
        mission_kind: mission_kind,
      },
    });
    return result;
  }
}
