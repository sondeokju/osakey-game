import { Injectable } from '@nestjs/common';
import { CreateMissionTypeDto } from './dto/create-mission_type.dto';
import { UpdateMissionTypeDto } from './dto/update-mission_type.dto';

@Injectable()
export class MissionTypeService {
  create(createMissionTypeDto: CreateMissionTypeDto) {
    return 'This action adds a new missionType';
  }

  findAll() {
    return `This action returns all missionType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionType`;
  }

  update(id: number, updateMissionTypeDto: UpdateMissionTypeDto) {
    return `This action updates a #${id} missionType`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionType`;
  }
}
