import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { LogUrlModule } from 'src/common/log_url/log_url.module';
import { UserSnsFollowModule } from 'src/inventory/sns/user_sns_follow/user_sns_follow.module';
import { UserSnsLevelModule } from 'src/inventory/sns/user_sns_level/user_sns_level.module';
import { UserSnsRewardModule } from 'src/inventory/sns/user_sns_reward/user_sns_reward.module';
import { UserTunaTvModule } from 'src/inventory/sns/user_tuna_tv/user_tuna_tv.module';
import { RealtimeModule } from 'src/SocketIO/realtime/realtime.module';
import { ControlTableModule } from 'src/static-table/control_table/control_table.module';
import { EquipStatModule } from 'src/static-table/equip-stat/equip-stat.module';
import { GachaModule } from 'src/static-table/gacha/gacha.module';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { ItemEquipslotModule } from 'src/static-table/item-equipslot/item-equipslot.module';
import { ItemGradeModule } from 'src/static-table/item-grade/item-grade.module';
import { ItemModule } from 'src/static-table/item/item.module';
import { ItemTypeModule } from 'src/static-table/item_type/item_type.module';
import { MissionModule } from 'src/static-table/mission/mission.module';
import { MissionCategoryModule } from 'src/static-table/mission_category/mission_category.module';
import { MissionKindModule } from 'src/static-table/mission_kind/mission_kind.module';
import { MissionMainModule } from 'src/static-table/mission_main/mission_main.module';
import { MissionRoutineModule } from 'src/static-table/mission_routine/mission_routine.module';
import { MissionRoutineBonusModule } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.module';
import { MissionSubModule } from 'src/static-table/mission_sub/mission_sub.module';
import { NpcModule } from 'src/static-table/npc/npc.module';
import { NpcLocationModule } from 'src/static-table/npc_location/npc_location.module';
import { RewardModule } from 'src/static-table/reward/reward.module';
import { SnsConfigModule } from 'src/static-table/sns/sns_config/sns_config.module';
import { SnsLevelModule } from 'src/static-table/sns/sns_level/sns_level.module';
import { SnsLikeRuleModule } from 'src/static-table/sns/sns_like_rule/sns_like_rule.module';
import { SnsRewardModule } from 'src/static-table/sns/sns_reward/sns_reward.module';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { UserEquipmentSlotModule } from 'src/user-equipment-slot/user-equipment-slot.module';
import { UserEquipmentModule } from 'src/user-equipment/user-equipment.module';
import { UserAdModule } from 'src/user_ad/user_ad.module';
import { UserBattleModule } from 'src/user_battle/user_battle.module';
import { UserEventAttendanceModule } from 'src/user_event_attendance/user_event_attendance.module';
import { UserItemModule } from 'src/user_item/user_item.module';
import { UserQuestModule } from 'src/user_quest/user_quest.module';
import { UsersModule } from 'src/users/users.module';

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
  RealtimeModule,
  UserTunaTvModule,
  UserSnsRewardModule,
  UserSnsLevelModule,
  UserSnsFollowModule,
];
