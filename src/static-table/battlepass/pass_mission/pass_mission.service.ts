import { Injectable } from '@nestjs/common';
import { CreatePassMissionDto } from './dto/create-pass_mission.dto';
import { UpdatePassMissionDto } from './dto/update-pass_mission.dto';

@Injectable()
export class PassMissionService {
  create(createPassMissionDto: CreatePassMissionDto) {
    return 'This action adds a new passMission';
  }

  findAll() {
    return `This action returns all passMission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passMission`;
  }

  update(id: number, updatePassMissionDto: UpdatePassMissionDto) {
    return `This action updates a #${id} passMission`;
  }

  remove(id: number) {
    return `This action removes a #${id} passMission`;
  }
}
