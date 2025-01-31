import { Module } from '@nestjs/common';
import { ControlTableService } from './control_table.service';
import { ControlTableController } from './control_table.controller';
import { Mission } from '../mission/entities/mission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionKind } from '../mission_kind/entities/mission_kind.entity';
import { MissionMain } from '../mission_main/entities/mission_main.entity';
import { MissionRoutine } from '../mission_routine/entities/mission_routine.entity';
import { MissionRoutineBonus } from '../mission_routine_bonus/entities/mission_routine_bonus.entity';
import { MissionSub } from '../mission_sub/entities/mission_sub.entity';
import { Reward } from '../reward/entities/reward.entity';
import { Item } from '../item/entities/item.entity';
import { Hero } from '../hero/entities/hero.entity';
import { MissionService } from '../mission/mission.service';
import { MissionKindService } from '../mission_kind/mission_kind.service';
import { MissionMainService } from '../mission_main/mission_main.service';
import { MissionRoutineService } from '../mission_routine/mission_routine.service';
import { MissionRoutineBonusService } from '../mission_routine_bonus/mission_routine_bonus.service';
import { MissionSubService } from '../mission_sub/mission_sub.service';
import { RewardService } from '../reward/reward.service';
import { ItemService } from '../item/item.service';
import { HeroService } from '../hero/hero.service';
import { NpcService } from '../npc/npc.service';
import { Npc } from '../npc/entities/npc.entity';
import { NpcLocation } from '../npc_location/entities/npc_location.entity';
import { NpcLocationService } from '../npc_location/npc_location.service';
import { SnsConfigService } from '../sns/sns_config/sns_config.service';
import { SnsLevelService } from '../sns/sns_level/sns_level.service';
import { SnsLikeRuleService } from '../sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from '../sns/sns_reward/sns_reward.service';
import { SnsConfig } from '../sns/sns_config/entities/sns_config.entity';
import { SnsLevel } from '../sns/sns_level/entities/sns_level.entity';
import { SnsLikeRule } from '../sns/sns_like_rule/entities/sns_like_rule.entity';
import { SnsReward } from '../sns/sns_reward/entities/sns_reward.entity';
import { Dispatch } from '../dispatch/dispatch/entities/dispatch.entity';
import { DispatchConfig } from '../dispatch/dispatch_config/entities/dispatch_config.entity';
import { DispatchEquipGrade } from '../dispatch/dispatch_equip_grade/entities/dispatch_equip_grade.entity';
import { DispatchEquipLevel } from '../dispatch/dispatch_equip_level/entities/dispatch_equip_level.entity';
import { DispatchUpgrade } from '../dispatch/dispatch_upgrade/entities/dispatch_upgrade.entity';
import { DispatchService } from '../dispatch/dispatch/dispatch.service';
import { DispatchConfigService } from '../dispatch/dispatch_config/dispatch_config.service';
import { DispatchEquipGradeService } from '../dispatch/dispatch_equip_grade/dispatch_equip_grade.service';
import { DispatchEquipLevelService } from '../dispatch/dispatch_equip_level/dispatch_equip_level.service';
import { DispatchUpgradeService } from '../dispatch/dispatch_upgrade/dispatch_upgrade.service';
import { EduService } from '../edu/edu/edu.service';
import { EduCurriculumService } from '../edu/edu_curriculum/edu_curriculum.service';
import { EduListService } from '../edu/edu_list/edu_list.service';
import { EduReduceTimeService } from '../edu/edu_reduce_time/edu_reduce_time.service';
import { Edu } from '../edu/edu/entities/edu.entity';
import { EduCurriculum } from '../edu/edu_curriculum/entities/edu_curriculum.entity';
import { EduList } from '../edu/edu_list/entities/edu_list.entity';
import { EduReduceTime } from '../edu/edu_reduce_time/entities/edu_reduce_time.entity';
import { Equip } from '../equipment/equip/entities/equip.entity';
import { EquipGrade } from '../equipment/equip_grade/entities/equip_grade.entity';
import { EquipSkill } from '../equipment/equip_skill/entities/equip_skill.entity';
import { EquipLevel } from '../equipment/equip_level/entities/equip_level.entity';
import { EquipService } from '../equipment/equip/equip.service';
import { EquipGradeService } from '../equipment/equip_grade/equip_grade.service';
import { EquipSkillService } from '../equipment/equip_skill/equip_skill.service';
import { EquipLevelService } from '../equipment/equip_level/equip_level.service';
import { EquipOptionService } from '../equipment/equip_option/equip_option.service';
import { EquipOption } from '../equipment/equip_option/entities/equip_option.entity';
import { CollectionBoss } from '../collection/collection_boss/entities/collection_boss.entity';
import { CollectionBossMemory } from '../collection/collection_boss_memory/entities/collection_boss_memory.entity';
import { CollectionEquip } from '../collection/collection_equip/entities/collection_equip.entity';
import { CollectionNpc } from '../collection/collection_npc/entities/collection_npc.entity';
import { CollectionSuit } from '../collection/collection_suit/entities/collection_suit.entity';
import { ServerConfig } from '../config/server_config/entities/server_config.entity';
import { CollectionService } from '../collection/collection/collection.service';
import { CollectionSuitService } from '../collection/collection_suit/collection_suit.service';
import { CollectionNpcService } from '../collection/collection_npc/collection_npc.service';
import { CollectionBossService } from '../collection/collection_boss/collection_boss.service';
import { CollectionEquipService } from '../collection/collection_equip/collection_equip.service';
import { CollectionBossMemoryService } from '../collection/collection_boss_memory/collection_boss_memory.service';
import { ServerConfigService } from '../config/server_config/server_config.service';
import { Collection } from '../collection/collection/entities/collection.entity';
import { AttendanceService } from '../attendance/attendance/attendance.service';
import { Attendance } from '../attendance/attendance/entities/attendance.entity';
import { SystemNotice } from '../config/system_notice/entities/system_notice.entity';
import { SystemNoticeService } from '../config/system_notice/system_notice.service';
import { AchieveListService } from '../achieve/achieve_list/achieve_list.service';
import { AchieveList } from '../achieve/achieve_list/entities/achieve_list.entity';
import { BattleStage } from '../stage/battle_stage/entities/battle_stage.entity';
import { PuzzleStage } from '../stage/puzzle_stage/entities/puzzle_stage.entity';
import { RunStage } from '../stage/run_stage/entities/run_stage.entity';
import { BattleStageService } from '../stage/battle_stage/battle_stage.service';
import { PuzzleStageService } from '../stage/puzzle_stage/puzzle_stage.service';
import { RunStageService } from '../stage/run_stage/run_stage.service';
import { SuitService } from '../suit/suit/suit.service';
import { SuitLevelService } from '../suit/suit_level/suit_level.service';
import { SuitOptionService } from '../suit/suit_option/suit_option.service';
import { SuitSkillService } from '../suit/suit_skill/suit_skill.service';
import { SuitUltimateService } from '../suit/suit_ultimate/suit_ultimate.service';
import { SuitUltimateLevelService } from '../suit/suit_ultimate_level/suit_ultimate_level.service';
import { Suit } from '../suit/suit/entities/suit.entity';
import { SuitLevel } from '../suit/suit_level/entities/suit_level.entity';
import { SuitOption } from '../suit/suit_option/entities/suit_option.entity';
import { SuitSkill } from '../suit/suit_skill/entities/suit_skill.entity';
import { SuitUltimate } from '../suit/suit_ultimate/entities/suit_ultimate.entity';
import { SuitUltimateLevel } from '../suit/suit_ultimate_level/entities/suit_ultimate_level.entity';
import { SecameDiary } from '../secame/secame_diary/entities/secame_diary.entity';
import { SecameMail } from '../secame/secame_mail/entities/secame_mail.entity';
import { SecameDiaryService } from '../secame/secame_diary/secame_diary.service';
import { SecameMailService } from '../secame/secame_mail/secame_mail.service';
import { Skill } from '../skill/skill/entities/skill.entity';
import { SkillService } from '../skill/skill/skill.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mission,
      MissionKind,
      MissionMain,
      MissionRoutine,
      MissionRoutineBonus,
      MissionSub,
      Reward,
      MissionRoutine,
      Item,
      Hero,
      Npc,
      NpcLocation,
      SnsConfig,
      SnsLevel,
      SnsLikeRule,
      SnsReward,
      Dispatch,
      DispatchConfig,
      DispatchEquipGrade,
      DispatchEquipLevel,
      DispatchUpgrade,
      Edu,
      EduCurriculum,
      EduList,
      EduReduceTime,
      Equip,
      EquipGrade,
      EquipSkill,
      EquipLevel,
      EquipOption,
      Collection,
      CollectionSuit,
      CollectionNpc,
      CollectionBoss,
      CollectionEquip,
      CollectionBossMemory,
      ServerConfig,
      Attendance,
      SystemNotice,
      AchieveList,
      BattleStage,
      PuzzleStage,
      RunStage,
      Suit,
      SuitLevel,
      SuitOption,
      SuitSkill,
      SuitUltimate,
      SuitUltimateLevel,
      SecameDiary,
      SecameMail,
      Skill,
    ]),
  ],
  exports: [ControlTableService],
  controllers: [ControlTableController],
  providers: [
    ControlTableService,
    MissionService,
    MissionKindService,
    MissionMainService,
    MissionRoutineService,
    MissionRoutineBonusService,
    MissionSubService,
    RewardService,
    ItemService,
    HeroService,
    NpcService,
    NpcLocationService,
    SnsConfigService,
    SnsLevelService,
    SnsLikeRuleService,
    SnsRewardService,
    DispatchService,
    DispatchConfigService,
    DispatchEquipGradeService,
    DispatchEquipLevelService,
    DispatchUpgradeService,
    EduService,
    EduCurriculumService,
    EduListService,
    EduReduceTimeService,
    EquipService,
    EquipGradeService,
    EquipSkillService,
    EquipLevelService,
    EquipOptionService,
    CollectionService,
    CollectionSuitService,
    CollectionNpcService,
    CollectionBossService,
    CollectionEquipService,
    CollectionBossMemoryService,
    ServerConfigService,
    AttendanceService,
    SystemNoticeService,
    AchieveListService,
    BattleStageService,
    PuzzleStageService,
    RunStageService,
    SuitService,
    SuitLevelService,
    SuitOptionService,
    SuitSkillService,
    SuitUltimateService,
    SuitUltimateLevelService,
    SecameDiaryService,
    SecameMailService,
    SkillService,
  ],
})
export class ControlTableModule {}
