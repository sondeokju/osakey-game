import { LogUrl } from 'src/common/log_url/entities/log_url.entity';
import { UserEduStats } from 'src/inventory/edu/user_edu_stats/entities/user_edu_stats.entity';
import { UserTunaTvOnline } from 'src/inventory/sns/user-tuna-tv-online/entities/user-tuna-tv-online.entity';
import { UserSnsFollow } from 'src/inventory/sns/user_sns_follow/entities/user_sns_follow.entity';
import { UserSnsLevel } from 'src/inventory/sns/user_sns_level/entities/user_sns_level.entity';
import { UserSnsLikes } from 'src/inventory/sns/user_sns_likes/entities/user_sns_likes.entity';
import { UserSnsReward } from 'src/inventory/sns/user_sns_reward/entities/user_sns_reward.entity';
import { UserTunaTv } from 'src/inventory/sns/user_tuna_tv/entities/user_tuna_tv.entity';
import { Dispatch } from 'src/static-table/dispatch/dispatch/entities/dispatch.entity';
import { DispatchConfig } from 'src/static-table/dispatch/dispatch_config/entities/dispatch_config.entity';
import { DispatchEquipGrade } from 'src/static-table/dispatch/dispatch_equip_grade/entities/dispatch_equip_grade.entity';
import { DispatchEquipLevel } from 'src/static-table/dispatch/dispatch_equip_level/entities/dispatch_equip_level.entity';
import { DispatchUpgrade } from 'src/static-table/dispatch/dispatch_upgrade/entities/dispatch_upgrade.entity';
import { Edu } from 'src/static-table/edu/edu/entities/edu.entity';
import { EduCurriculum } from 'src/static-table/edu/edu_curriculum/entities/edu_curriculum.entity';
import { EduList } from 'src/static-table/edu/edu_list/entities/edu_list.entity';
import { EduReduceTime } from 'src/static-table/edu/edu_reduce_time/entities/edu_reduce_time.entity';
import { EquipStat } from 'src/static-table/equip-stat/entities/equip-stat.entity';
import { Gacha } from 'src/static-table/gacha/entities/gacha.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { ItemEquipslot } from 'src/static-table/item-equipslot/entities/item-equipslot.entity';
import { ItemGrade } from 'src/static-table/item-grade/entities/item-grade.entity';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemType } from 'src/static-table/item_type/entities/item_type.entity';
import { Mission } from 'src/static-table/mission/entities/mission.entity';
import { MissionCategory } from 'src/static-table/mission_category/entities/mission_category.entity';
import { MissionKind } from 'src/static-table/mission_kind/entities/mission_kind.entity';
import { MissionMain } from 'src/static-table/mission_main/entities/mission_main.entity';
import { MissionRoutine } from 'src/static-table/mission_routine/entities/mission_routine.entity';
import { MissionRoutineBonus } from 'src/static-table/mission_routine_bonus/entities/mission_routine_bonus.entity';
import { MissionSub } from 'src/static-table/mission_sub/entities/mission_sub.entity';
import { Npc } from 'src/static-table/npc/entities/npc.entity';
import { NpcLocation } from 'src/static-table/npc_location/entities/npc_location.entity';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsLevel } from 'src/static-table/sns/sns_level/entities/sns_level.entity';
import { SnsLikeRule } from 'src/static-table/sns/sns_like_rule/entities/sns_like_rule.entity';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { UserEquipmentSlot } from 'src/user-equipment-slot/entities/user-equipment-slot.entity';
import { UserEquipment } from 'src/user-equipment/entities/user-equipment.entity';
import { UserAd } from 'src/user_ad/entities/user_ad.entity';
import { UserBattle } from 'src/user_battle/entities/user_battle.entity';
import { UserEventAttendance } from 'src/user_event_attendance/entities/user_event_attendance.entity';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserQuest } from 'src/user_quest/entity/user_quest.entity';
import { Users } from 'src/users/entity/users.entity';

export const entities = [
  Users,
  Item,
  ItemEquipslot,
  ItemGrade,
  EquipStat,
  UserEquipment,
  UserEquipmentSlot,
  Gacha,
  Reward,
  Mission,
  ItemType,
  MissionKind,
  MissionCategory,
  Hero,
  Npc,
  NpcLocation,
  LogUrl,
  SnsConfig,
  SnsReward,
  SnsLevel,
  SnsLikeRule,
  UserItem,
  UserAd,
  UserEventAttendance,
  MissionRoutine,
  MissionRoutineBonus,
  MissionMain,
  MissionSub,
  UserQuest,
  UserBattle,
  UserSnsFollow,
  UserSnsLevel,
  UserSnsReward,
  UserTunaTv,
  UserTunaTvOnline,
  Edu,
  EduCurriculum,
  EduReduceTime,
  EduList,
  Dispatch,
  DispatchConfig,
  DispatchEquipGrade,
  DispatchEquipLevel,
  DispatchUpgrade,
  UserEduStats,
  UserSnsLikes,
];
