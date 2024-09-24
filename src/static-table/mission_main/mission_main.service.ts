import { Injectable } from '@nestjs/common';
import { CreateMissionMainDto } from './dto/create-mission_main.dto';
import { UpdateMissionMainDto } from './dto/update-mission_main.dto';

@Injectable()
export class MissionMainService {
  create(createMissionMainDto: CreateMissionMainDto) {
    return 'This action adds a new missionMain';
  }

  findAll() {
    return `This action returns all missionMain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionMain`;
  }

  update(id: number, updateMissionMainDto: UpdateMissionMainDto) {
    return `This action updates a #${id} missionMain`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionMain`;
  }
}
