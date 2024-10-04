import { Injectable } from '@nestjs/common';
import { CreateMissionKindDto } from './dto/create-mission_kind.dto';
import { UpdateMissionKindDto } from './dto/update-mission_kind.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MissionKind } from './entities/mission_kind.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class MissionKindService {
  constructor(
    @InjectRepository(MissionKind)
    private readonly missionKindRepository: Repository<MissionKind>,
  ) {}

  getMissionKindRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<MissionKind>(MissionKind)
      : this.missionKindRepository;
  }

  async getMissionKindAll(qr?: QueryRunner) {
    const missionKindRepository = this.getMissionKindRepository(qr);
    const result = await missionKindRepository.find({});
    console.log(result);
    return result;
  }
}
