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

  async getMissionSubNextLevel(
    npc: number,
    mission_level: number,
    qr?: QueryRunner,
  ) {
    const missionSubRepository = this.getMissionSubRepository(qr);
    const result = await missionSubRepository.findOne({
      where: {
        npc,
        mission_level,
      },
    });

    return result;
  }

  async getMissionSubNextNpc(
    mission_level: number,
    npc: number,
    qr?: QueryRunner,
  ) {
    const missionSubRepository = this.getMissionSubRepository(qr);

    const result = await missionSubRepository
      .createQueryBuilder('mission_sub')
      .where('mission_sub.npc > :npc', { npc })
      .andWhere('mission_sub.mission_level = :mission_level', { mission_level })
      .orderBy('mission_sub.npc', 'ASC')
      .limit(1)
      .getOne();

    return result;
  }

  async getNextMissionSubID(
    npc: number,
    mission_level: number,
    findNextNpc: boolean = false,
    qr?: QueryRunner,
  ) {
    const missionSubRepository = this.getMissionSubRepository(qr);

    let query = missionSubRepository
      .createQueryBuilder('mission_sub')
      .andWhere('mission_sub.mission_level = :mission_level', {
        mission_level,
      });

    // findNextNpc가 true일 경우 npc > :npc 조건을 추가
    if (findNextNpc) {
      query = query
        .where('mission_sub.npc > :npc', { npc })
        .orderBy('mission_sub.npc', 'ASC')
        .limit(1);
    } else {
      query = query.andWhere('mission_sub.npc = :npc', { npc });
    }

    const result = await query.getOne();
    return result;
  }

  // async getNextMissionSubID(
  //   npc: number,
  //   mission_level: number,
  //   findNextNpc: boolean = false,
  //   qr?: QueryRunner,
  // ) {
  //   const missionSubRepository = this.getMissionSubRepository(qr);

  //   let query = missionSubRepository
  //     .createQueryBuilder('mission_sub')
  //     .andWhere('mission_sub.mission_level = :mission_level', {
  //       mission_level,
  //     });

  //   // findNextNpc가 true일 경우 npc > :npc 조건을 추가
  //   if (findNextNpc) {
  //     query = query
  //       .where('mission_sub.npc > :npc', { npc })
  //       .orderBy('mission_sub.npc', 'ASC')
  //       .limit(1);
  //   } else {
  //     query = query.andWhere('mission_sub.npc = :npc', { npc });
  //   }

  //   const result = await query.getOne();
  //   return result;
  // }

  // async getReward(mission_id: number) {
  //   const result = await this.rewardGroupRepository.findOne({
  //     where: {
  //       mission_id,
  //     },
  //   });

  //   return result;
  // }
}
