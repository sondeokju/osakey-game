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
import { UserChallengeService } from 'src/inventory/challenge/user_challenge/user_challenge.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserMissionService {
  constructor(
    @InjectRepository(UserMission)
    private readonly userMissionRepository: Repository<UserMission>,
    private readonly dataSource: DataSource,
    private readonly rewardOfferService: RewardOfferService,
    private readonly userChallengeService: UserChallengeService,
    private readonly usersService: UsersService,
  ) {}

  getUserMissionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMission>(UserMission)
      : this.userMissionRepository;
  }

  async clearMission(
    user_id: string,
    user_mission_id: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    // if (!user_mission_id || typeof user_mission_id !== 'number') {
    //   throw new BadRequestException('Invalid mission_id provided.');
    // }

    const userMissionRepository = this.getUserMissionRepository(qr);

    await userMissionRepository.update(
      { id: user_mission_id, user_id }, // 조건
      { clear_count: () => 'clear_count + 1' }, // `clear_count` 증가
    );

    const result = await userMissionRepository.find({
      where: {
        user_id,
      },
    });

    // 아무 NPC 미션 클리어 횟수
    await this.userChallengeService.challengeQuest(user_id, 12400008, 1);

    return result;
  }

  async insertMission(user_id: string, mission_id: number, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    if (!mission_id || typeof mission_id !== 'number') {
      throw new BadRequestException('Invalid mission_id provided.');
    }

    const userMissionRepository = this.getUserMissionRepository(qr);

    const savedMission = await userMissionRepository.insert({
      user_id,
      mission_id,
    });

    return savedMission;
  }

  async saveMssion(
    user_id: string,
    mission_id: number,
    mission_goal: number,
    mission_kind: string,
    //clear_count: number,
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
    // if (!clear_count || isNaN(clear_count)) {
    //   throw new BadRequestException('Invalid clear_count provided.');
    // }

    const userMissionRepository = this.getUserMissionRepository(qr);
    let userMission = await userMissionRepository.findOne({
      where: {
        user_id,
        mission_id,
      },
    });

    if (!userMission) {
      userMission = userMissionRepository.create({
        user_id,
        mission_id,
        mission_kind,
        mission_goal,
        //clear_count,
        reward_id,
      });
    } else {
      //userMission.clear_count += +clear_count; // 기존 값에 새로운 clear_count 더하기
    }

    await userMissionRepository.save(userMission);
    const result = await userMissionRepository.find({
      where: {
        user_id,
      },
    });
    return result;
  }

  async missionTry(
    user_id: string,
    mission_id: number,
    mission_try_yn: string,
    battery: number,
    qr?: QueryRunner,
  ) {
    const userMissionRepository = this.getUserMissionRepository(qr);
    const userMission = await userMissionRepository.findOne({
      where: {
        user_id,
        mission_id,
      },
    });

    const user = await this.usersService.reduceBattery(user_id, +battery, qr);
    const savedMission = await userMissionRepository.save({
      ...userMission,
      mission_try_yn,
    });

    return {
      user,
    };
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

    return { reward: { userItemData: rewardData } };
  }
}
