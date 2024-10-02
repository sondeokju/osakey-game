import { Injectable } from '@nestjs/common';
import { CreateMissionTypeDefineDto } from './dto/create-mission_type_define.dto';
import { UpdateMissionTypeDefineDto } from './dto/update-mission_type_define.dto';

@Injectable()
export class MissionTypeDefineService {
  create(createMissionTypeDefineDto: CreateMissionTypeDefineDto) {
    return 'This action adds a new missionTypeDefine';
  }

  findAll() {
    return `This action returns all missionTypeDefine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionTypeDefine`;
  }

  update(id: number, updateMissionTypeDefineDto: UpdateMissionTypeDefineDto) {
    return `This action updates a #${id} missionTypeDefine`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionTypeDefine`;
  }
}
