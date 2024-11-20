import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { LogUrlModule } from './common/log_url/log_url.module';
import { ControlTableModule } from './static-table/control_table/control_table.module';
import { EquipStatModule } from './static-table/equip-stat/equip-stat.module';
import { GachaModule } from './static-table/gacha/gacha.module';
import { HeroModule } from './static-table/hero/hero.module';
import { ItemEquipslotModule } from './static-table/item-equipslot/item-equipslot.module';
import { ItemGradeModule } from './static-table/item-grade/item-grade.module';
import { ItemModule } from './static-table/item/item.module';
import { ItemTypeModule } from './static-table/item_type/item_type.module';
import { MissionModule } from './static-table/mission/mission.module';
import { MissionCategoryModule } from './static-table/mission_category/mission_category.module';
import { MissionKindModule } from './static-table/mission_kind/mission_kind.module';
import { MissionMainModule } from './static-table/mission_main/mission_main.module';
import { MissionRoutineModule } from './static-table/mission_routine/mission_routine.module';
import { MissionRoutineBonusModule } from './static-table/mission_routine_bonus/mission_routine_bonus.module';
import { MissionSubModule } from './static-table/mission_sub/mission_sub.module';
import { NpcModule } from './static-table/npc/npc.module';
import { NpcLocationModule } from './static-table/npc_location/npc_location.module';
import { RewardModule } from './static-table/reward/reward.module';
import { SnsConfigModule } from './static-table/sns/sns_config/sns_config.module';
import { SnsLevelModule } from './static-table/sns/sns_level/sns_level.module';
import { SnsLikeRuleModule } from './static-table/sns/sns_like_rule/sns_like_rule.module';
import { SnsRewardModule } from './static-table/sns/sns_reward/sns_reward.module';
import { RewardOfferModule } from './supervisor/reward_offer/reward_offer.module';
import { UserEquipmentSlotModule } from './user-equipment-slot/user-equipment-slot.module';
import { UserEquipmentModule } from './user-equipment/user-equipment.module';
import { UserAdModule } from './user_ad/user_ad.module';
import { UserBattleModule } from './user_battle/user_battle.module';
import { UserEventAttendanceModule } from './user_event_attendance/user_event_attendance.module';
import { UserItemModule } from './user_item/user_item.module';
import { UserQuestModule } from './user_quest/user_quest.module';
import { UsersModule } from './users/users.module';

export const entities_module = [
  UsersModule,
  AuthModule,
  CommonModule,
  ItemModule,
  ItemEquipslotModule,
  ItemGradeModule,
  EquipStatModule,
  UserEquipmentModule,
  UserEquipmentSlotModule,
  GachaModule,
  UserItemModule,
  UserAdModule,
  UserEventAttendanceModule,
  RewardModule,
  MissionRoutineModule,
  MissionRoutineBonusModule,
  MissionMainModule,
  MissionSubModule,
  UserQuestModule,
  UserBattleModule,
  MissionModule,
  ItemTypeModule,
  MissionKindModule,
  MissionCategoryModule,
  HeroModule,
  NpcModule,
  ControlTableModule,
  RewardOfferModule,
  LogUrlModule,
  NpcLocationModule,
  SnsConfigModule,
  SnsRewardModule,
  SnsLevelModule,
  SnsLikeRuleModule,
];
