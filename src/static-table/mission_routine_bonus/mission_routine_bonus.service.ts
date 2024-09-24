import { Injectable } from '@nestjs/common';
import { CreateMissionRoutineBonusDto } from './dto/create-mission_routine_bonus.dto';
import { UpdateMissionRoutineBonusDto } from './dto/update-mission_routine_bonus.dto';

@Injectable()
export class MissionRoutineBonusService {
  create(createMissionRoutineBonusDto: CreateMissionRoutineBonusDto) {
    return 'This action adds a new missionRoutineBonus';
  }

  findAll() {
    return `This action returns all missionRoutineBonus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionRoutineBonus`;
  }

  update(id: number, updateMissionRoutineBonusDto: UpdateMissionRoutineBonusDto) {
    return `This action updates a #${id} missionRoutineBonus`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionRoutineBonus`;
  }
}
