import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMission } from './entities/user_mission.entity';
import { DataSource } from 'typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserMissionService {
  constructor(
    @InjectRepository(UserMission)
    private readonly userMissionRepository: Repository<UserMission>,
    private readonly dataSource: DataSource,
  ) {}

  getUserMissionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMission>(UserMission)
      : this.userMissionRepository;
  }

  async saveMssion(
    user_id: string,
    mission_id: number,
    mission_goal: number,
    mission_kind: string,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    if (!mission_id || isNaN(mission_id)) {
      throw new BadRequestException('Invalid mission_id provided.');
    }

    const userMissionRepository = this.getUserMissionRepository(qr);
    let userMission = await userMissionRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userMission) {
      userMission = userMissionRepository.create({
        user_id,
        mission_id,
        mission_goal,
        mission_kind,
      });
    }

    const result = await userMissionRepository.save({
      ...userMission,
    });

    return result;
  }

  async missionList(user_id: string, qr?: QueryRunner) {
    const userMissionRepository = this.getUserMissionRepository(qr);
    const userMission = await userMissionRepository.find({
      where: {
        user_id,
      },
    });

    return userMission;
  }
}
