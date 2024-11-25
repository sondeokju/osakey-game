import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
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
import { NpcLocationService } from '../npc_location/npc_location.service';
import { SnsConfigService } from '../sns/sns_config/sns_config.service';
import { SnsLevelService } from '../sns/sns_level/sns_level.service';
import { SnsLikeRuleService } from '../sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from '../sns/sns_reward/sns_reward.service';
import { DispatchService } from '../dispatch/dispatch/dispatch.service';
import { DispatchConfigService } from '../dispatch/dispatch_config/dispatch_config.service';
import { DispatchEquipGradeService } from '../dispatch/dispatch_equip_grade/dispatch_equip_grade.service';
import { DispatchEquipLevelService } from '../dispatch/dispatch_equip_level/dispatch_equip_level.service';
import { DispatchUpgradeService } from '../dispatch/dispatch_upgrade/dispatch_upgrade.service';

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
    private readonly npcLocationService: NpcLocationService,
    private readonly snsConfigService: SnsConfigService,
    private readonly snsLevelService: SnsLevelService,
    private readonly snsLikeRuleService: SnsLikeRuleService,
    private readonly snsRewardService: SnsRewardService,
    private readonly dispatchService: DispatchService,
    private readonly dispatchConfigService: DispatchConfigService,
    private readonly dispatchEquipGradeService: DispatchEquipGradeService,
    private readonly dispatchEquipLevelService: DispatchEquipLevelService,
    private readonly dispatchUpgradeService: DispatchUpgradeService,
  ) {}

  async getControlTableAll(qr?: QueryRunner) {
    const obj = {
      mission_all: await this.getMissionAll(qr),
      item: await this.getItemAll(qr),
      hero: await this.getHeroAll(qr),
      npc: await this.getNpcAll(qr),
      npc_location: await this.getNpcLocationAll(qr),
      reward: await this.getRewardAll(qr),
      sns: await this.getSnsAll(qr),
      dispatch: await this.getDispatchAll(qr),
    };

    return obj;
  }

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

    return obj;
  }

  async getItemAll(qr?: QueryRunner) {
    return await this.itemService.getItemAll(qr);
  }

  async getHeroAll(qr?: QueryRunner) {
    return await this.heroService.getHeroAll(qr);
  }

  async getNpcAll(qr?: QueryRunner) {
    return await this.npcService.getNpcAll(qr);
  }

  async getNpcLocationAll(qr?: QueryRunner) {
    return await this.npcLocationService.getNpcLocationAll(qr);
  }

  async getRewardAll(qr?: QueryRunner) {
    return await this.rewardService.getRewardAll(qr);
  }

  async getSnsAll(qr?: QueryRunner) {
    const obj = {
      sns_config: await this.snsConfigService.getSnsConfigAll(qr),
      sns_level: await this.snsLevelService.getSnsLevelAll(qr),
      sns_like_rule: await this.snsLikeRuleService.getSnsLikeRuleAll(qr),
      sns_reward: await this.snsRewardService.getSnsRewardAll(qr),
    };

    return obj;
  }

  async getDispatchAll(qr?: QueryRunner) {
    const obj = {
      dispatch: await this.dispatchService.getDispatchAll(qr),
      dispatch_config:
        await this.dispatchConfigService.getDispatchConfigAll(qr),
      dispatch_equip_grade:
        await this.dispatchEquipGradeService.getDispatchEquipGradeAll(qr),
      dispatch_equip_level:
        await this.dispatchEquipLevelService.getDispatchEquipLevelAll(qr),
      dispatch_upgrade:
        await this.dispatchUpgradeService.getDispatchUpgradeAll(qr),
    };

    return obj;
  }
}
