import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entity/users.entity';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
import { ItemService } from 'src/static-table/item/item.service';
import { MissionService } from 'src/static-table/mission/mission.service';
import { MissionKindService } from 'src/static-table/mission_kind/mission_kind.service';
import { MissionMainService } from 'src/static-table/mission_main/mission_main.service';
import { MissionRoutineBonusService } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.service';
import { MissionSubService } from 'src/static-table/mission_sub/mission_sub.service';
import { RewardService } from 'src/static-table/reward/reward.service';

@Injectable()
export class UserQuestService {
  constructor(
    @InjectRepository(UserQuest)
    private readonly userQuestRepository: Repository<UserQuest>,
    private readonly rewardGroupService: RewardService,
    private readonly itemService: ItemService,
    private readonly missionService: MissionService,
    private readonly missionKindService: MissionKindService,
    private readonly missionMainService: MissionMainService,
    private readonly missionRoutineService: MissionRoutineService,
    private readonly missionRoutineBonusService: MissionRoutineBonusService,
    private readonly missionSubService: MissionSubService,
  ) {}

  getUserQuestRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserQuest>(UserQuest)
      : this.userQuestRepository;
  }

  //   getUsersRepository(qr?: QueryRunner) {
  //     return qr
  //       ? qr.manager.getRepository<Users>(Users)
  //       : this.usersRepository;
  //   }

  async getMissionAll(qr?: QueryRunner) {
    const obj = {
      mission: await this.missionService.getMissionAll(qr),
      mission_kind: await this.missionKindService.getMissionKindAll(qr),
      mission_main: await this.missionMainService.getMissionMainAll(qr),

      mission_routine:
        await this.missionRoutineService.getMissionRoutineAll(qr),

      mission_routine_bonus:
        await this.missionRoutineBonusService.getMissionRoutineBonusAll(qr),

      mission_sub: await this.missionSubService.getMissionSubAll(qr),
    };

    // const obj = {
    //   mssion: { mission: await this.missionService.getMissionAll(qr) },
    //   mission_kind: {
    //     mission_kind: await this.missionKindService.getMissionKindAll(qr),
    //   },
    //   mission_main: {
    //     mission_main: await this.missionMainService.getMissionMainAll(qr),
    //   },
    //   mission_routine: {
    //     mission_routine:
    //       await this.missionRoutineService.getMissionRoutineAll(qr),
    //   },
    //   mission_routine_bonus: {
    //     mission_routine_bonus:
    //       await this.missionRoutineBonusService.getMissionRoutineBonusAll(
    //         qr,
    //       ),
    //   },
    //   mission_sub: {
    //     mission_sub: await this.missionSubService.getMissionSubAll(qr),
    //   },
    // };

    return obj;
  }

  // async getQuestRewardList(user_quest_id: number, qr?: QueryRunner) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const userQuestData = await userQuestRepository.findOne({
  //     where: {
  //       id: user_quest_id,
  //     },
  //   });

  //   console.log('user_quest_id 1:', user_quest_id);
  //   console.log('user_quest_id 2:', userQuestData.id);

  //   const missionRoutineData =
  //     await this.missionRoutineService.getMissionRoutine(
  //       userQuestData.mission_id,
  //     );

  //   console.log('userQuestData.mission_id:', userQuestData.mission_id);

  //   // const rewardData = await this.rewardGroupService.getReward(
  //   //   missionRoutineData.reward,
  //   // );

  //   // // console.log(
  //   // //   'missionRoutineData.mission_type_reward:',
  //   // //   missionRoutineData.reward,
  //   // // );

  //   // console.log('rewardData.reward_item_id:', rewardData.reward_item_id);
  //   //return await this.itemService.getItem(rewardData.reward_item_id);
  //   return 0;
  // }

  // async getUserQuestAll(user_id: number, qr?: QueryRunner) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const result = await userQuestRepository.find({
  //     where: {
  //       user_id,
  //     },
  //   });
  //   return result;
  // }

  // async getUserQuestTypeList(
  //   user_id: number,
  //   mission_type: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const result = await userQuestRepository.find({
  //     where: {
  //       user_id,
  //       mission_type,
  //     },
  //   });
  //   return result;
  // }

  // async questDayWeekReward(
  //   user_id: number,
  //   user_quest_id: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const userQuestData = await userQuestRepository.findOne({
  //     where: {
  //       id: user_quest_id,
  //     },
  //   });

  //   const missionRoutineData =
  //     await this.missionRoutineService.getMissionRoutine(
  //       userQuestData.mission_id,
  //     );

  //   //console.log('userQuestData.mission_id:', userQuestData.mission_id);

  //   const rewardData = await this.rewardGroupService.getReward(
  //     missionRoutineData.mission_routine_id,
  //   );

  //   // console.log(
  //   //   'missionRoutineData.mission_type_reward:',
  //   //   missionRoutineData.mission_type_reward,
  //   // );

  //   //console.log('rewardData.reward_item_id:', rewardData.reward_item_id);
  //   const itemData = this.itemService.getItem(rewardData.reward_item_id);

  //   // await usersRepository.save({
  //   //   ...userData,
  //   //   gord: userData.gord + gord,
  //   //   exp: userData.exp + exp,
  //   //   battery: userData.battery + battery,
  //   // });

  //   await userQuestRepository.save({
  //     ...userQuestData,
  //     mission_complete_yn: 'Y',
  //   });

  //   // 1 : currency, 2:material, 3:equipment, 4:package, 5:event
  //   const obj = {
  //     item_id: { item_id: (await itemData).item_id },
  //     item_name: { item_name: (await itemData).item_name },
  //     item_qty: { item_qty: rewardData.reward_item_qty },
  //   };

  //   const result = Object.values(obj);

  //   return result;
  // }

  // async questSubReward(
  //   user_id: number,
  //   user_quest_id: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const userQuestData = await userQuestRepository.findOne({
  //     where: {
  //       id: user_quest_id,
  //     },
  //   });

  //   const missionSubData = await this.missionRoutineService.getMissionRoutine(
  //     userQuestData.mission_id,
  //   );

  //   const rewardData = await this.rewardGroupService.getReward(
  //     missionSubData.mission_routine_id,
  //   );
  //   const itemData = this.itemService.getItem(rewardData.reward_item_id);

  //   // await usersRepository.save({
  //   //   ...userData,
  //   //   gord: userData.gord + gord,
  //   //   exp: userData.exp + exp,
  //   //   battery: userData.battery + battery,
  //   // });

  //   await userQuestRepository.save({
  //     ...userQuestData,
  //     mission_complete_yn: 'Y',
  //   });

  //   // 1 : currency, 2:material, 3:equipment, 4:package, 5:event
  //   const obj = {
  //     item_id: { item_id: (await itemData).item_id },
  //     item_name: { item_name: (await itemData).item_name },
  //     item_qty: { item_qty: rewardData.reward_item_qty },
  //   };

  //   const result = Object.values(obj);

  //   return result;
  // }

  // async questMainReward(
  //   user_id: number,
  //   user_quest_id: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const userQuestData = await userQuestRepository.findOne({
  //     where: {
  //       id: user_quest_id,
  //     },
  //   });

  //   const missionRoutineData =
  //     await this.missionRoutineService.getMissionRoutine(
  //       userQuestData.mission_id,
  //     );

  //   const rewardData = await this.rewardGroupService.getReward(
  //     missionRoutineData.reward,
  //   );
  //   const itemData = this.itemService.getItem(rewardData.reward_item_id);

  //   // await usersRepository.save({
  //   //   ...userData,
  //   //   gord: userData.gord + gord,
  //   //   exp: userData.exp + exp,
  //   //   battery: userData.battery + battery,
  //   // });

  //   await userQuestRepository.save({
  //     ...userQuestData,
  //     mission_complete_yn: 'Y',
  //   });

  //   // 1 : currency, 2:material, 3:equipment, 4:package, 5:event
  //   const obj = {
  //     item_id: { item_id: (await itemData).item_id },
  //     item_name: { item_name: (await itemData).item_name },
  //     item_qty: { item_qty: rewardData.reward_item_qty },
  //   };

  //   const result = Object.values(obj);

  //   return result;
  // }
}
