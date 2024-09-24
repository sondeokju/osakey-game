import { Injectable } from '@nestjs/common';
import { CreateMissionRoutineDto } from './dto/create-mission_routine.dto';
import { UpdateMissionRoutineDto } from './dto/update-mission_routine.dto';

@Injectable()
export class MissionRoutineService {
  create(createMissionRoutineDto: CreateMissionRoutineDto) {
    return 'This action adds a new missionRoutine';
  }

  findAll() {
    return `This action returns all missionRoutine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionRoutine`;
  }

  update(id: number, updateMissionRoutineDto: UpdateMissionRoutineDto) {
    return `This action updates a #${id} missionRoutine`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionRoutine`;
  }
}
