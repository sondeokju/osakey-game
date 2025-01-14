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
import { EduService } from '../edu/edu/edu.service';
import { EduCurriculumService } from '../edu/edu_curriculum/edu_curriculum.service';
import { EduListService } from '../edu/edu_list/edu_list.service';
import { EduReduceTimeService } from '../edu/edu_reduce_time/edu_reduce_time.service';
import { EquipService } from '../equipment/equip/equip.service';
import { EquipGradeService } from '../equipment/equip_grade/equip_grade.service';
import { EquipSkillService } from '../equipment/equip_skill/equip_skill.service';
import { EquipLevelService } from '../equipment/equip_level/equip_level.service';
import { EquipOptionService } from '../equipment/equip_option/equip_option.service';
import { CollectionService } from '../collection/collection/collection.service';
import { CollectionSuitService } from '../collection/collection_suit/collection_suit.service';
import { CollectionNpcService } from '../collection/collection_npc/collection_npc.service';
import { CollectionEquipService } from '../collection/collection_equip/collection_equip.service';
import { CollectionBossService } from '../collection/collection_boss/collection_boss.service';
import { CollectionBossMemoryService } from '../collection/collection_boss_memory/collection_boss_memory.service';
import { ServerConfigService } from '../config/server_config/server_config.service';
import { AttendanceService } from '../attendance/attendance/attendance.service';
import { SystemNoticeService } from '../config/system_notice/system_notice.service';
import { AchieveListService } from '../achieve/achieve_list/achieve_list.service';

@Injectable()
export class ControlTableService {
  constructor(
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
    private readonly eduService: EduService,
    private readonly eduCurriculumService: EduCurriculumService,
    private readonly eduListService: EduListService,
    private readonly eduReduceTimeService: EduReduceTimeService,
    private readonly equipService: EquipService,
    private readonly equipGraeService: EquipGradeService,
    private readonly equipSkillService: EquipSkillService,
    private readonly equipLevelService: EquipLevelService,
    private readonly equipOptionService: EquipOptionService,
    private readonly collectionService: CollectionService,
    private readonly collectionSuitService: CollectionSuitService,
    private readonly collectionNpcService: CollectionNpcService,
    private readonly collectionEquipService: CollectionEquipService,
    private readonly collectionBossService: CollectionBossService,
    private readonly collectionBossMemoryService: CollectionBossMemoryService,
    private readonly serverConfigService: ServerConfigService,
    private readonly attendanceService: AttendanceService,
    private readonly systemNoticeService: SystemNoticeService,
    private readonly achieveListService: AchieveListService,
  ) {}

  async getControlTableAll(qr?: QueryRunner) {
    const static_table = {
      mission_all: await this.getMissionAll(qr),
      item: await this.getItemAll(qr),
      hero: await this.getHeroAll(qr),
      npc: await this.getNpcAll(qr),
      npc_location: await this.getNpcLocationAll(qr),
      reward: await this.getRewardAll(qr),
      sns: await this.getSnsAll(qr),
      dispatch: await this.getDispatchAll(qr),
      edu: await this.getEduAll(qr),
      equipment: await this.getEquipmentAll(qr),
      server_config: await this.serverConfigService.getServerConfigAll(qr),
      collection: await this.getCollectionAll(qr),
      attendance: await this.attendanceService.getAttendanceAll(qr),
      system_notice: await this.systemNoticeService.getSystemNoticeAll(qr),
      acheve_list: await this.achieveListService.getAttendanceAll(qr),
    };

    return static_table;
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

  async getEduAll(qr?: QueryRunner) {
    const obj = {
      edu: await this.eduService.getEduAll(qr),
      edu_curriculum: await this.eduCurriculumService.getEduCurriculumAll(qr),
      edu_list: await this.eduListService.getEduListAll(qr),
      edu_reduce_time: await this.eduReduceTimeService.getEduReduceTimeAll(qr),
    };

    return obj;
  }

  async getEquipmentAll(qr?: QueryRunner) {
    const obj = {
      equip: await this.equipService.getEquipAll(qr),
      equip_grade: await this.equipGraeService.getEquipGradeAll(qr),
      equip_skill: await this.equipSkillService.getEquipSkillAll(qr),
      equip_level: await this.equipLevelService.getEquipLevelAll(qr),
      equip_option: await this.equipOptionService.getEquipOptionAll(qr),
    };

    return obj;
  }

  async getCollectionAll(qr?: QueryRunner) {
    const obj = {
      collection: await this.collectionService.getCollectionAll(qr),
      collection_suit:
        await this.collectionSuitService.getCollectionSuitAll(qr),
      collection_npc: await this.collectionNpcService.getCollectionNpcAll(qr),
      collection_equip:
        await this.collectionEquipService.getCollectionEquipAll(qr),
      collection_boss:
        await this.collectionBossService.getCollectionBossAll(qr),
      collection_boss_memory:
        await this.collectionBossMemoryService.getCollectionBossMemoryAll(qr),
    };

    return obj;
  }

  async getConfigAll(qr?: QueryRunner) {
    const obj = {
      server_config: await this.serverConfigService.getServerConfigAll(qr),
    };

    return obj;
  }
}
