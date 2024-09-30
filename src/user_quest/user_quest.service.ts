import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/entity/users.entity';
import { RewardGroupService } from 'src/static-table/reward_group/reward_group.service';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';

@Injectable()
export class UserQuestService {
  constructor(
    @InjectRepository(UserQuest)
    private readonly userQuestRepository: Repository<UserQuest>,
    private readonly rewardGroupService: RewardGroupService,
    private readonly missionRoutineService: MissionRoutineService,
  ) {}

  getUserQuestRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserQuest>(UserQuest)
      : this.userQuestRepository;
  }

  //   getUsersRepository(qr?: QueryRunner) {
  //     return qr
  //       ? qr.manager.getRepository<UsersModel>(UsersModel)
  //       : this.usersRepository;
  //   }

  async getUserQuestAll(user_id: number, qr?: QueryRunner) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const result = await userQuestRepository.find({
      where: {
        user_id,
      },
    });
    return result;
  }

  //   async getUserQuestTypeList(
  //     id: number,
  //     mission_type: number,
  //     qr?: QueryRunner,
  //   ) {
  //     const usersRepository = this.getUsersRepository(qr);
  //     const result = await usersRepository.find({
  //       where: {
  //         id,
  //       },
  //     });
  //     return result;
  //   }

  async questDayReward(user_id: number, type, mission_id, qr?: QueryRunner) {
    // if (gord < 0) return -1;
    // if (exp < 0) return -1;
    // if (battery < 0) return -1;

    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        user_id,
      },
    });

    const missionRoutineData =
      await this.missionRoutineService.getMissionRoutine(
        userQuestData.mission_id,
      );

    // const rewardData = await this.rewardGroupService.getReward(
    //   missionRoutineData.mission_type_reward,
    // );

    // await usersRepository.save({
    //   ...userData,
    //   gord: userData.gord + gord,
    //   exp: userData.exp + exp,
    //   battery: userData.battery + battery,
    // });

    const obj = {
      gord: { gord: 1 },
      exp: { exp: 1 },
      battery: { battery: 1 },
    };

    const result = Object.values(obj);

    return result;
  }

  async questWeekReward(id: number, type, battery, qr?: QueryRunner) {
    return 1;
  }

  async questSubReward(id: number, type, battery, qr?: QueryRunner) {
    return 1;
  }

  async questMainReward(id: number, type, battery, qr?: QueryRunner) {
    return 1;
  }
}
