import { Injectable } from '@nestjs/common';
import { CreateMissionKindDefineDto } from './dto/create-mission_kind_define.dto';
import { UpdateMissionKindDefineDto } from './dto/update-mission_kind_define.dto';

@Injectable()
export class MissionKindDefineService {
  create(createMissionKindDefineDto: CreateMissionKindDefineDto) {
    return 'This action adds a new missionKindDefine';
  }

  findAll() {
    return `This action returns all missionKindDefine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionKindDefine`;
  }

  update(id: number, updateMissionKindDefineDto: UpdateMissionKindDefineDto) {
    return `This action updates a #${id} missionKindDefine`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionKindDefine`;
  }
}
