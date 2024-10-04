import { Injectable } from '@nestjs/common';
import { CreateMissionMainDto } from './dto/create-mission_main.dto';
import { UpdateMissionMainDto } from './dto/update-mission_main.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { MissionMain } from './entities/mission_main.entity';

@Injectable()
export class MissionMainService {
  constructor(
    @InjectRepository(MissionMain)
    private readonly missionMainRepository: Repository<MissionMain>,
  ) {}

  getMissionMainRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<MissionMain>(MissionMain)
      : this.missionMainRepository;
  }

  async getMissionMainAll(qr?: QueryRunner) {
    const missionMainRepository = this.getMissionMainRepository(qr);
    const result = await missionMainRepository.find({});
    return result;
  }
}
