import { Injectable } from '@nestjs/common';
import { CreateMissionSubDto } from './dto/create-mission_sub.dto';
import { UpdateMissionSubDto } from './dto/update-mission_sub.dto';

@Injectable()
export class MissionSubService {
  create(createMissionSubDto: CreateMissionSubDto) {
    return 'This action adds a new missionSub';
  }

  findAll() {
    return `This action returns all missionSub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionSub`;
  }

  update(id: number, updateMissionSubDto: UpdateMissionSubDto) {
    return `This action updates a #${id} missionSub`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionSub`;
  }
}
