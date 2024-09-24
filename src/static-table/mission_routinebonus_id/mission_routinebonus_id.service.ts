import { Injectable } from '@nestjs/common';
import { CreateMissionRoutinebonusIdDto } from './dto/create-mission_routinebonus_id.dto';
import { UpdateMissionRoutinebonusIdDto } from './dto/update-mission_routinebonus_id.dto';

@Injectable()
export class MissionRoutinebonusIdService {
  create(createMissionRoutinebonusIdDto: CreateMissionRoutinebonusIdDto) {
    return 'This action adds a new missionRoutinebonusId';
  }

  findAll() {
    return `This action returns all missionRoutinebonusId`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionRoutinebonusId`;
  }

  update(id: number, updateMissionRoutinebonusIdDto: UpdateMissionRoutinebonusIdDto) {
    return `This action updates a #${id} missionRoutinebonusId`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionRoutinebonusId`;
  }
}
