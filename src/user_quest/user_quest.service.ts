import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/entity/users.entity';
import { RewardGroupService } from 'src/static-table/reward_group/reward_group.service';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
import { ItemService } from 'src/static-table/item/item.service';

@Injectable()
export class UserQuestService {
  constructor(
    @InjectRepository(UserQuest)
    private readonly userQuestRepository: Repository<UserQuest>,
    private readonly rewardGroupService: RewardGroupService,
    private readonly missionRoutineService: MissionRoutineService,
    private readonly itemService: ItemService,
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

  async getUserQuestTypeList(
    id: number,
    mission_type: number,
    qr?: QueryRunner,
  ) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const result = await userQuestRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async questDayReward(id: number, qr?: QueryRunner) {
    // if (gord < 0) return -1;
    // if (exp < 0) return -1;
    // if (battery < 0) return -1;

    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id,
      },
    });

    const missionRoutineData =
      await this.missionRoutineService.getMissionRoutine(
        userQuestData.mission_id,
      );

    const rewardData = await this.rewardGroupService.getReward(
      missionRoutineData.mission_type_reward,
    );

    const itemData = await this.itemService.getItem(rewardData.reward_item_id);

    // await usersRepository.save({
    //   ...userData,
    //   gord: userData.gord + gord,
    //   exp: userData.exp + exp,
    //   battery: userData.battery + battery,
    // });

    const obj = {
      item_id: { item_id: itemData.item_id },
      item_name: { item_name: itemData.item_name },
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
