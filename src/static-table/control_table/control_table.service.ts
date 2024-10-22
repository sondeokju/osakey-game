import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
import { MissionService } from 'src/static-table/mission/mission.service';
import { MissionKindService } from 'src/static-table/mission_kind/mission_kind.service';
import { MissionMainService } from 'src/static-table/mission_main/mission_main.service';
import { MissionRoutineBonusService } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.service';
import { MissionSubService } from 'src/static-table/mission_sub/mission_sub.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { HeroService } from 'src/static-table/hero/hero.service';
import { ItemService } from '../item/item.service';
import { NpcService } from '../npc/npc.service';

@Injectable()
export class ControlTableService {
  constructor(
    //@InjectRepository(UserQuest)
    private readonly missionService: MissionService,
    private readonly missionKindService: MissionKindService,
    private readonly missionMainService: MissionMainService,
    private readonly missionRoutineService: MissionRoutineService,
    private readonly missionRoutineBonusService: MissionRoutineBonusService,
    private readonly missionSubService: MissionSubService,
    private readonly rewardService: RewardService,
    private readonly heroService: HeroService,
    private readonly itemService: ItemService,
    private readonly npcService: NpcService,
  ) {}

  async getControlTableAll(qr?: QueryRunner) {
    const obj = {
      mission: await this.getMissionAll(qr),
      item: await this.getItemAll(qr),
      hero: await this.getHeroAll(qr),
      npc: await this.getNpcAll(qr),
      reward: this.getRewardAll(qr),
    };

    return obj;
  }

  async getMissionAll(qr?: QueryRunner) {
    const obj = {
      // mission: await this.missionService.getMissionAll(qr),
      // mission_kind: await this.missionKindService.getMissionKindAll(qr),
      // mission_main: await this.missionMainService.getMissionMainAll(qr),
      // mission_routine:
      //   await this.missionRoutineService.getMissionRoutineAll(qr),
      // mission_routine_bonus:
      //   await this.missionRoutineBonusService.getMissionRoutineBonusAll(qr),
      // mission_sub: await this.missionSubService.getMissionSubAll(qr),
    };

    return obj;
  }

  async getItemAll(qr?: QueryRunner) {
    const obj = {
      item: await this.itemService.getItemAll(qr),
    };

    return obj;
  }

  async getHeroAll(qr?: QueryRunner) {
    const obj = {
      mission: await this.heroService.getHeroAll(qr),
    };

    return obj;
  }

  async getNpcAll(qr?: QueryRunner) {
    const obj = {
      mission: await this.npcService.getNpcAll(qr),
    };

    return obj;
  }

  async getRewardAll(qr?: QueryRunner) {
    const obj = {
      mission: await this.rewardService.getRewardAll(qr),
    };

    return obj;
  }
}
