import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMission } from './entities/user_mission.entity';
import { DataSource } from 'typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Injectable()
export class UserMissionService {
  constructor(
    @InjectRepository(UserMission)
    private readonly userMissionRepository: Repository<UserMission>,
    private readonly dataSource: DataSource,
    private readonly rewardOfferService: RewardOfferService,
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
    clear_count: number,
    reward_id: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    if (!mission_id || isNaN(mission_id)) {
      throw new BadRequestException('Invalid mission_id provided.');
    }
    if (!mission_goal || isNaN(mission_goal)) {
      throw new BadRequestException('Invalid mission_goal provided.');
    }
    if (!mission_kind || typeof mission_kind !== 'string') {
      throw new BadRequestException('Invalid mission_kind provided.');
    }
    if (!clear_count || isNaN(clear_count)) {
      throw new BadRequestException('Invalid clear_count provided.');
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
        mission_kind,
        mission_goal,
        clear_count,
        reward_id,
      });
    } else {
      userMission.clear_count += +clear_count; // 기존 값에 새로운 clear_count 더하기
    }

    const savedMission = await userMissionRepository.save(userMission);
    return savedMission;
  }

  async missionTry(
    user_id: string,
    mission_id: number,
    mission_try_yn: string,
    qr?: QueryRunner,
  ) {
    const userMissionRepository = this.getUserMissionRepository(qr);
    const userMission = await userMissionRepository.findOne({
      where: {
        user_id,
        mission_id,
      },
    });

    console.log('mission_id', mission_id);
    console.log('mission_try_yn', mission_try_yn);
    console.log('userMission', userMission);

    const savedMission = await userMissionRepository.save({
      ...userMission,
      mission_try_yn,
    });
    return savedMission;
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

  async missionReward(
    user_id: string,
    user_mission_id: number,
    qr?: QueryRunner,
  ) {
    const userMissionRepository = this.getUserMissionRepository(qr);
    const userMission = await userMissionRepository.findOne({
      where: {
        id: user_mission_id,
      },
    });

    if (!userMission) {
      throw new NotFoundException('User mission not found.');
    }

    if (userMission.reward_yn === 'Y') {
      throw new NotFoundException(
        'You have already claimed the mission reward.',
      );
    }
    const rewardData = await this.rewardOfferService.reward(
      user_id,
      userMission.reward_id,
      qr,
    );

    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    // userMission 업데이트
    userMission.reward_yn = 'Y';
    const updatedMission = await userMissionRepository.save(userMission);

    return { success: true, reward: rewardData, userMission: updatedMission };
  }
}
