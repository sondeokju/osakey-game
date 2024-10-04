import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Mission } from './entities/mission.entity';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
  ) {}

  getMissionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Mission>(Mission)
      : this.missionRepository;
  }

  async getMissionAll(qr?: QueryRunner) {
    const missionRepository = this.getMissionRepository(qr);
    const result = await missionRepository.find({});
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}
