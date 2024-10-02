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

  async getQuestRewardList(user_quest_id: number, qr?: QueryRunner) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });

    console.log('user_quest_id 1:', user_quest_id);
    console.log('user_quest_id 2:', userQuestData.id);

    const missionRoutineData =
      await this.missionRoutineService.getMissionRoutine(
        userQuestData.mission_id,
      );

    console.log('userQuestData.mission_id:', userQuestData.mission_id);

    const rewardData = await this.rewardGroupService.getReward(
      missionRoutineData.mission_type_reward,
    );

    console.log(
      'missionRoutineData.mission_type_reward:',
      missionRoutineData.mission_type_reward,
    );

    console.log('rewardData.reward_item_id:', rewardData.reward_item_id);
    return await this.itemService.getItem(rewardData.reward_item_id);
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
    user_id: number,
    mission_type: number,
    qr?: QueryRunner,
  ) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const result = await userQuestRepository.find({
      where: {
        user_id,
        mission_type,
      },
    });
    return result;
  }

  async questDayWeekReward(
    user_id: number,
    user_quest_id: number,
    qr?: QueryRunner,
  ) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });

    const missionRoutineData =
      await this.missionRoutineService.getMissionRoutine(
        userQuestData.mission_id,
      );

    //console.log('userQuestData.mission_id:', userQuestData.mission_id);

    const rewardData = await this.rewardGroupService.getReward(
      missionRoutineData.mission_routine_id,
    );

    // console.log(
    //   'missionRoutineData.mission_type_reward:',
    //   missionRoutineData.mission_type_reward,
    // );

    //console.log('rewardData.reward_item_id:', rewardData.reward_item_id);
    const itemData = this.itemService.getItem(rewardData.reward_item_id);

    // await usersRepository.save({
    //   ...userData,
    //   gord: userData.gord + gord,
    //   exp: userData.exp + exp,
    //   battery: userData.battery + battery,
    // });

    await userQuestRepository.save({
      ...userQuestData,
      mission_complete_yn: 'Y',
    });

    // 1 : currency, 2:material, 3:equipment, 4:package, 5:event
    const obj = {
      item_id: { item_id: (await itemData).item_id },
      item_name: { item_name: (await itemData).item_name },
      item_qty: { item_qty: rewardData.reward_item_qty },
    };

    const result = Object.values(obj);

    return result;
  }

  async questSubReward(
    user_id: number,
    user_quest_id: number,
    qr?: QueryRunner,
  ) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });

    const missionSubData = await this.missionRoutineService.getMissionRoutine(
      userQuestData.mission_id,
    );

    const rewardData = await this.rewardGroupService.getReward(
      missionSubData.mission_routine_id,
    );
    const itemData = this.itemService.getItem(rewardData.reward_item_id);

    // await usersRepository.save({
    //   ...userData,
    //   gord: userData.gord + gord,
    //   exp: userData.exp + exp,
    //   battery: userData.battery + battery,
    // });

    await userQuestRepository.save({
      ...userQuestData,
      mission_complete_yn: 'Y',
    });

    // 1 : currency, 2:material, 3:equipment, 4:package, 5:event
    const obj = {
      item_id: { item_id: (await itemData).item_id },
      item_name: { item_name: (await itemData).item_name },
      item_qty: { item_qty: rewardData.reward_item_qty },
    };

    const result = Object.values(obj);

    return result;
  }

  async questMainReward(
    user_id: number,
    user_quest_id: number,
    qr?: QueryRunner,
  ) {
    const userQuestRepository = this.getUserQuestRepository(qr);
    const userQuestData = await userQuestRepository.findOne({
      where: {
        id: user_quest_id,
      },
    });

    const missionRoutineData =
      await this.missionRoutineService.getMissionRoutine(
        userQuestData.mission_id,
      );

    const rewardData = await this.rewardGroupService.getReward(
      missionRoutineData.mission_type_reward,
    );
    const itemData = this.itemService.getItem(rewardData.reward_item_id);

    // await usersRepository.save({
    //   ...userData,
    //   gord: userData.gord + gord,
    //   exp: userData.exp + exp,
    //   battery: userData.battery + battery,
    // });

    await userQuestRepository.save({
      ...userQuestData,
      mission_complete_yn: 'Y',
    });

    // 1 : currency, 2:material, 3:equipment, 4:package, 5:event
    const obj = {
      item_id: { item_id: (await itemData).item_id },
      item_name: { item_name: (await itemData).item_name },
      item_qty: { item_qty: rewardData.reward_item_qty },
    };

    const result = Object.values(obj);

    return result;
  }
}
