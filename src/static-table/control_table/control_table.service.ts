//import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
//import { Cache } from 'cache-manager';
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
import { BattleStageService } from '../stage/battle_stage/battle_stage.service';
import { PuzzleStageService } from '../stage/puzzle_stage/puzzle_stage.service';
import { RunStageService } from '../stage/run_stage/run_stage.service';
import { SuitService } from '../suit/suit/suit.service';
import { SuitLevelService } from '../suit/suit_level/suit_level.service';
import { SuitOptionService } from '../suit/suit_option/suit_option.service';
import { SuitSkillService } from '../suit/suit_skill/suit_skill.service';
import { SuitUltimateService } from '../suit/suit_ultimate/suit_ultimate.service';
import { SuitUltimateLevelService } from '../suit/suit_ultimate_level/suit_ultimate_level.service';
import { SecameDiaryService } from '../secame/secame_diary/secame_diary.service';
import { SecameMailService } from '../secame/secame_mail/secame_mail.service';
import { SkillService } from '../skill/skill/skill.service';
import { TutorialRewardService } from '../tutorial/tutorial_reward/tutorial_reward.service';
import { GachaService } from '../draw/gacha/gacha.service';
import { GachaOutputService } from '../draw/gacha_output/gacha_output.service';
import { BountyStageService } from '../stage/bounty_stage/bounty_stage.service';
import { ShopPackageService } from '../shop/shop_package/shop_package.service';
import { ShopService } from '../shop/shop/shop.service';
import { GachaSellService } from '../shop/gacha_sell/gacha_sell.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ControlTableService {
  constructor(
    //@Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly redisService: RedisService,
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
    private readonly battleStageService: BattleStageService,
    private readonly puzzleStageService: PuzzleStageService,
    private readonly runStageService: RunStageService,
    private readonly suitService: SuitService,
    private readonly suitLevelService: SuitLevelService,
    private readonly suitOptionService: SuitOptionService,
    private readonly suitSkillService: SuitSkillService,
    private readonly suitUltimateService: SuitUltimateService,
    private readonly suitUltimateLevelService: SuitUltimateLevelService,
    private readonly secameDiaryService: SecameDiaryService,
    private readonly secameMailService: SecameMailService,
    private readonly skillService: SkillService,
    private readonly tutorialRewardService: TutorialRewardService,
    private readonly gachaService: GachaService,
    private readonly gachaOutputService: GachaOutputService,
    private readonly bountyStageService: BountyStageService,
    private readonly shopPackageService: ShopPackageService,
    private readonly shopService: ShopService,
    private readonly gachaSellService: GachaSellService,
  ) {}

  async getControlTableAllPromise(qr?: QueryRunner) {
    const [
      mission_all,
      item,
      hero,
      npc,
      npc_location,
      reward,
      sns,
      dispatch,
      edu,
      equipment,
      server_config,
      collection,
      attendance,
      system_notice,
      acheve_list,
      stage,
      suit,
      secame,
      equipment_skill,
      tutorial,
      gacha,
      shop,
    ] = await Promise.all([
      this.getMissionAll(qr),
      this.getItemAll(qr),
      this.getHeroAll(qr),
      this.getNpcAll(qr),
      this.getNpcLocationAll(qr),
      this.getRewardAll(qr),
      this.getSnsAll(qr),
      this.getDispatchAll(qr),
      this.getEduAll(qr),
      this.getEquipmentAll(qr),
      this.serverConfigService.getServerConfigAll(qr),
      this.getCollectionAll(qr),
      this.attendanceService.getAttendanceAll(qr),
      this.systemNoticeService.getSystemNoticeAll(qr),
      this.achieveListService.getAchieveAll(qr),
      this.getStageAll(qr),
      this.getSuitAll(qr),
      this.getSecameAll(qr),
      this.getSkillAll(qr),
      this.getTutorialAll(qr),
      this.getGachaAll(qr),
      this.getShopAll(qr),
    ]);

    return {
      mission_all,
      item,
      hero,
      npc,
      npc_location,
      reward,
      sns,
      dispatch,
      edu,
      equipment,
      server_config,
      collection,
      attendance,
      system_notice,
      acheve_list,
      stage,
      suit,
      secame,
      equipment_skill,
      tutorial,
      gacha,
      shop,
    };
  }

  // 데이터 업데이트 후 캐시 무효화 예시
  // async updateData(qr?: QueryRunner) {
  //   // DB 업데이트 로직 실행

  //   // 캐시 무효화
  //   await this.cacheManager.del('controlTableAll');
  // }

  async getControlTableWithCacheAll(qr?: QueryRunner) {
    const cacheKey = 'controlTableAll';

    // 캐시에서 데이터 조회
    //const cachedData = await this.cacheManager.get(cacheKey);
    const cachedData = await this.redisService.getKey(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // 캐시에 데이터가 없으면 DB에서 조회
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
      acheve_list: await this.achieveListService.getAchieveAll(qr),
      stage: await this.getStageAll(qr),
      suit: await this.getSuitAll(qr),
      secame: await this.getSecameAll(qr),
      equipment_skill: await this.getSkillAll(qr),
      tutorial: await this.getTutorialAll(qr),
      gacha: await this.getGachaAll(qr),
      shop: await this.getShopAll(qr),
    };

    // 조회한 데이터를 캐시에 저장 (TTL: 600초)
    //await this.cacheManager.set(cacheKey, static_table, { ttl: 600 });
    await this.redisService.setKey(cacheKey, static_table);

    return static_table;
  }

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
      acheve_list: await this.achieveListService.getAchieveAll(qr),
      stage: await this.getStageAll(qr),
      suit: await this.getSuitAll(qr),
      secame: await this.getSecameAll(qr),
      equipment_skill: await this.getSkillAll(qr),
      tutorial: await this.getTutorialAll(qr),
      gacha: await this.getGachaAll(qr),
      shop: await this.getShopAll(qr),
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

  async getStageAll(qr?: QueryRunner) {
    const obj = {
      battle_stage: await this.battleStageService.getBattleStageAll(qr),
      puzzle_stage: await this.puzzleStageService.getPuzzleStageAll(qr),
      run_stage: await this.runStageService.getRunStageAll(qr),
      bounty_stage: await this.bountyStageService.getBountyStageAll(qr),
    };

    return obj;
  }

  async getSuitAll(qr?: QueryRunner) {
    const obj = {
      suit: await this.suitService.getSuitAll(qr),
      suit_level: await this.suitLevelService.getSuitLevelAll(qr),
      suit_option: await this.suitOptionService.getSuitOptionAll(qr),
      suit_skill: await this.suitSkillService.getSuitSkillAll(qr),
      suit_ultimate: await this.suitUltimateService.getSuitUltimateAll(qr),
      suit_ultimate_level:
        await this.suitUltimateLevelService.getSuitUltimateLevelAll(qr),
    };

    return obj;
  }

  async getSecameAll(qr?: QueryRunner) {
    const obj = {
      secame_diary: await this.secameDiaryService.getSecameDiaryAll(qr),
      secame_mail: await this.secameMailService.getSecameMailAll(qr),
    };

    return obj;
  }

  async getSkillAll(qr?: QueryRunner) {
    const obj = {
      skill: await this.skillService.getSkillAll(qr),
    };

    return obj;
  }

  async getTutorialAll(qr?: QueryRunner) {
    const obj = {
      tutorial_reward:
        await this.tutorialRewardService.getTutorialRewardAll(qr),
    };

    return obj;
  }

  async getGachaAll(qr?: QueryRunner) {
    const obj = {
      gacha: await this.gachaService.getGachaAll(qr),
      gacha_output: await this.gachaOutputService.getGachaOutputAll(qr),
    };

    return obj;
  }

  async getShopAll(qr?: QueryRunner) {
    const obj = {
      shop: await this.shopService.getShopAll(qr),
      shop_package: await this.shopPackageService.getShopPackageAll(qr),
      gacha_sell: await this.gachaSellService.getGachaSellAll(qr),
    };

    return obj;
  }
}
