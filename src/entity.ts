import { LogUrl } from './common/log_url/entities/log_url.entity';
import { EquipStat } from './static-table/equip-stat/entities/equip-stat.entity';
import { Gacha } from './static-table/gacha/entities/gacha.entity';
import { Hero } from './static-table/hero/entities/hero.entity';
import { ItemEquipslot } from './static-table/item-equipslot/entities/item-equipslot.entity';
import { ItemGrade } from './static-table/item-grade/entities/item-grade.entity';
import { Item } from './static-table/item/entities/item.entity';
import { ItemType } from './static-table/item_type/entities/item_type.entity';
import { Mission } from './static-table/mission/entities/mission.entity';
import { MissionCategory } from './static-table/mission_category/entities/mission_category.entity';
import { MissionKind } from './static-table/mission_kind/entities/mission_kind.entity';
import { MissionMain } from './static-table/mission_main/entities/mission_main.entity';
import { MissionRoutine } from './static-table/mission_routine/entities/mission_routine.entity';
import { MissionRoutineBonus } from './static-table/mission_routine_bonus/entities/mission_routine_bonus.entity';
import { MissionSub } from './static-table/mission_sub/entities/mission_sub.entity';
import { Npc } from './static-table/npc/entities/npc.entity';
import { NpcLocation } from './static-table/npc_location/entities/npc_location.entity';
import { Reward } from './static-table/reward/entities/reward.entity';
import { UserEquipmentSlot } from './user-equipment-slot/entities/user-equipment-slot.entity';
import { UserEquipment } from './user-equipment/entities/user-equipment.entity';
import { UserAd } from './user_ad/entities/user_ad.entity';
import { UserBattle } from './user_battle/entities/user_battle.entity';
import { UserEventAttendance } from './user_event_attendance/entities/user_event_attendance.entity';
import { UserItem } from './user_item/entities/user_item.entity';
import { UserQuest } from './user_quest/entity/user_quest.entity';
import { Users } from './users/entity/users.entity';

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
  UserItem,
  UserAd,
  UserEventAttendance,
  MissionRoutine,
  MissionRoutineBonus,
  MissionMain,
  MissionSub,
  UserQuest,
  UserBattle,
];
