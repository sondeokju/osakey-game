import { MissionRoutine } from './entities/mission_routine.entity';
import { Injectable } from '@nestjs/common';
import { CreateMissionRoutineDto } from './dto/create-mission_routine.dto';
import { UpdateMissionRoutineDto } from './dto/update-mission_routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class MissionRoutineService {
  constructor(
    @InjectRepository(MissionRoutine)
    private readonly missionRoutineRepository: Repository<MissionRoutine>,
  ) {}

  getMissionRoutineRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<MissionRoutine>(MissionRoutine)
      : this.missionRoutineRepository;
  }

  async getMissionRoutineAll(qr?: QueryRunner) {
    const missionRoutineRepository = this.getMissionRoutineRepository(qr);
    const result = await missionRoutineRepository.find({});
    return result;
  }

  async getMissionRoutine(mission_routine_id: number) {
    const result = await this.missionRoutineRepository.findOne({
      where: {
        mission_routine_id,
      },
    });

    return result;
  }
}
