import { Injectable } from '@nestjs/common';
import { CreateMissionSubDto } from './dto/create-mission_sub.dto';
import { UpdateMissionSubDto } from './dto/update-mission_sub.dto';
import { DataSource, IsNull, QueryRunner, Repository } from 'typeorm';
import { MissionSub } from './entities/mission_sub.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MissionSubService {
  constructor(
    @InjectRepository(MissionSub)
    private readonly missionSubRepository: Repository<MissionSub>,
  ) {}

  getMissionSubRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<MissionSub>(MissionSub)
      : this.missionSubRepository;
  }

  async getMissionSubAll(qr?: QueryRunner) {
    const missionSubRepository = this.getMissionSubRepository(qr);
    const result = await missionSubRepository.find({});
    return result;
  }

  async getMissionSub(mission_sub_id: number, qr?: QueryRunner) {
    const missionSubRepository = this.getMissionSubRepository(qr);
    const result = await missionSubRepository.findOne({
      where: {
        mission_sub_id,
      },
    });

    return result;
  }

  // async getReward(mission_id: number) {
  //   const result = await this.rewardGroupRepository.findOne({
  //     where: {
  //       mission_id,
  //     },
  //   });

  //   return result;
  // }
}
