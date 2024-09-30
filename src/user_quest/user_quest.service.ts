import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/entity/users.entity';
import { RewardGroup } from 'src/static-table/reward_group/entities/reward_group.entity';

@Injectable()
export class UserQuestService {
  //private readonly redisClient: Redis;

  constructor(
    @InjectRepository(UserQuest)
    private readonly userQuestRepository: Repository<UserQuest>,
    private readonly usersRepository: Repository<UsersModel>,
    private readonly rewardRepository: Repository<RewardGroup>,
  ) {}

  getUserQuestRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserQuest>(UserQuest)
      : this.userQuestRepository;
  }

  getUsersRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UsersModel>(UsersModel)
      : this.usersRepository;
  }

  getRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<RewardGroup>(RewardGroup)
      : this.rewardRepository;
  }

  async getUserQuestAll(user_id: number, qr?: QueryRunner) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const result = await userQuestRepository.find({
      where: {
        user_id,
      },
    });
    return result;
  }

  async getUserQuestTypeList(
    id: number,
    mission_type: number,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const result = await usersRepository.find({
      where: {
        id,
      },
    });
    return result;
  }

  async questDayReward(user_id: number, type, reward_group_id, qr?: QueryRunner) {
    // if (gord < 0) return -1;
    // if (exp < 0) return -1;
    // if (battery < 0) return -1;

    const rewardRepository = this.getRewardRepository(qr);
    const rewardData = await rewardRepository.findOne({
      where: {
        reward_group_id,
      },
    });

    const usersRepository = this.getUserQuestRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

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
