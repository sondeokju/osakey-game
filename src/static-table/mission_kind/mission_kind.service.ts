import { Injectable } from '@nestjs/common';
import { CreateMissionKindDto } from './dto/create-mission_kind.dto';
import { UpdateMissionKindDto } from './dto/update-mission_kind.dto';

@Injectable()
export class MissionKindService {
  create(createMissionKindDto: CreateMissionKindDto) {
    return 'This action adds a new missionKind';
  }

  findAll() {
    return `This action returns all missionKind`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionKind`;
  }

  update(id: number, updateMissionKindDto: UpdateMissionKindDto) {
    return `This action updates a #${id} missionKind`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionKind`;
  }
}
