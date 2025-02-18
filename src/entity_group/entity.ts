import { LogUrl } from 'src/common/log_url/entities/log_url.entity';
import { UserMemory } from 'src/inventory/boss/user_memory/entities/user_memory.entity';
import { UserMemoryRent } from 'src/inventory/boss/user_memory_rent/entities/user_memory_rent.entity';
import { UserRentama } from 'src/inventory/dispatch/user_rentama/entities/user_rentama.entity';
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
import { DispatchTest } from 'src/static-table/dispatch/dispatch_test/entities/dispatch_test.entity';
import { DispatchUpgrade } from 'src/static-table/dispatch/dispatch_upgrade/entities/dispatch_upgrade.entity';
import { Edu } from 'src/static-table/edu/edu/entities/edu.entity';
import { EduCurriculum } from 'src/static-table/edu/edu_curriculum/entities/edu_curriculum.entity';
import { EduList } from 'src/static-table/edu/edu_list/entities/edu_list.entity';
import { EduReduceTime } from 'src/static-table/edu/edu_reduce_time/entities/edu_reduce_time.entity';
import { Gacha } from 'src/static-table/draw/gacha/entities/gacha.entity';
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
import { UserBattle } from 'src/inventory/battle/user_battle/entities/user_battle.entity';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserQuest } from 'src/user_quest/entity/user_quest.entity';
import { Users } from 'src/users/entity/users.entity';
import { Equip } from 'src/static-table/equipment/equip/entities/equip.entity';
import { EquipGrade } from 'src/static-table/equipment/equip_grade/entities/equip_grade.entity';
import { EquipLevel } from 'src/static-table/equipment/equip_level/entities/equip_level.entity';
import { EquipSkill } from 'src/static-table/equipment/equip_skill/entities/equip_skill.entity';
import { UserEquip } from 'src/inventory/equipment/user_equip/entities/user_equip.entity';
import { UserEquipSlot } from 'src/inventory/equipment/user_equip_slot/entities/user_equip_slot.entity';
import { EquipOption } from 'src/static-table/equipment/equip_option/entities/equip_option.entity';
import { UserEquipOption } from 'src/inventory/equipment/user_equip_option/entities/user_equip_option.entity';
import { Collection } from 'src/static-table/collection/collection/entities/collection.entity';
import { CollectionSuit } from 'src/static-table/collection/collection_suit/entities/collection_suit.entity';
import { CollectionNpc } from 'src/static-table/collection/collection_npc/entities/collection_npc.entity';
import { CollectionBoss } from 'src/static-table/collection/collection_boss/entities/collection_boss.entity';
import { CollectionEquip } from 'src/static-table/collection/collection_equip/entities/collection_equip.entity';
import { CollectionBossMemory } from 'src/static-table/collection/collection_boss_memory/entities/collection_boss_memory.entity';
import { ServerConfig } from 'src/static-table/config/server_config/entities/server_config.entity';
import { UserMission } from 'src/inventory/mission/user_mission/entities/user_mission.entity';
import { UserAttendance } from 'src/inventory/attendance/user_attendance/entities/user_attendance.entity';
import { Attendance } from 'src/static-table/attendance/attendance/entities/attendance.entity';
import { SystemNotice } from 'src/static-table/config/system_notice/entities/system_notice.entity';
import { UserMail } from 'src/inventory/mail/user_mail/entities/user_mail.entity';
import { AchieveList } from 'src/static-table/achieve/achieve_list/entities/achieve_list.entity';
import { UserAchievements } from 'src/inventory/achievement/user_achievements/entities/user_achievements.entity';
import { UserOfflineReward } from 'src/inventory/reward/user_offline_reward/entities/user_offline_reward.entity';
import { UserCollection } from 'src/inventory/collection/user_collection/entities/user_collection.entity';
import { UserNpcFriendship } from 'src/inventory/npc/user_npc_friendship/entities/user_npc_friendship.entity';
import { ZLoginLog } from 'src/game_log/login/z_login_log/entities/z_login_log.entity';
import { Offline } from 'src/static-table/offline/offline/entities/offline.entity';
import { Pass } from 'src/static-table/battlepass/pass/entities/pass.entity';
import { PassSeason } from 'src/static-table/battlepass/pass_season/entities/pass_season.entity';
import { PassMission } from 'src/static-table/battlepass/pass_mission/entities/pass_mission.entity';
import { PassLevel } from 'src/static-table/battlepass/pass_level/entities/pass_level.entity';
import { PassEdu } from 'src/static-table/battlepass/pass_edu/entities/pass_edu.entity';
import { PassBounty } from 'src/static-table/battlepass/pass_bounty/entities/pass_bounty.entity';
import { ItemExchange } from 'src/static-table/exchange/item_exchange/entities/item_exchange.entity';
import { SecameDiary } from 'src/static-table/secame/secame_diary/entities/secame_diary.entity';
import { SecameMail } from 'src/static-table/secame/secame_mail/entities/secame_mail.entity';
import { Membership } from 'src/static-table/membership/membership/entities/membership.entity';
import { SuitOption } from 'src/static-table/suit/suit_option/entities/suit_option.entity';
import { SuitSkill } from 'src/static-table/suit/suit_skill/entities/suit_skill.entity';
import { UserItemExchange } from 'src/inventory/exchange/user_item_exchange/entities/user_item_exchange.entity';
import { UserMembership } from 'src/inventory/membership/user_membership/entities/user_membership.entity';
import { UserSecameDiary } from 'src/inventory/secame/user_secame_diary/entities/user_secame_diary.entity';
import { UserSecameMail } from 'src/inventory/secame/user_secame_mail/entities/user_secame_mail.entity';
import { UserSuit } from 'src/inventory/suit/user_suit/entities/user_suit.entity';
import { UserDispatch } from 'src/inventory/dispatch/user_dispatch/entities/user_dispatch.entity';
import { UserDispatchRentama } from 'src/inventory/dispatch/user_dispatch_rentama/entities/user_dispatch_rentama.entity';
import { UserBattlePass } from 'src/inventory/battlepass/user_battle_pass/entities/user_battle_pass.entity';
import { UserBattlePassReward } from 'src/inventory/battlepass/user_battle_pass_reward/entities/user_battle_pass_reward.entity';
import { UserMemorize } from 'src/inventory/boss/user_memorize/entities/user_memorize.entity';
import { UserMemoryShare } from 'src/inventory/boss/user_memory_share/entities/user_memory_share.entity';
import { BattleStage } from 'src/static-table/stage/battle_stage/entities/battle_stage.entity';
import { PuzzleStage } from 'src/static-table/stage/puzzle_stage/entities/puzzle_stage.entity';
import { RunStage } from 'src/static-table/stage/run_stage/entities/run_stage.entity';
import { Suit } from 'src/static-table/suit/suit/entities/suit.entity';
import { SuitLevel } from 'src/static-table/suit/suit_level/entities/suit_level.entity';
import { SuitUltimate } from 'src/static-table/suit/suit_ultimate/entities/suit_ultimate.entity';
import { SuitUltimateLevel } from 'src/static-table/suit/suit_ultimate_level/entities/suit_ultimate_level.entity';
import { UserIngameReward } from 'src/inventory/stage/user_ingame_reward/entities/user_ingame_reward.entity';
import { Skill } from 'src/static-table/skill/skill/entities/skill.entity';
import { UserTutorial } from 'src/inventory/tutorial/user_tutorial/entities/user_tutorial.entity';
import { TutorialReward } from 'src/static-table/tutorial/tutorial_reward/entities/tutorial_reward.entity';
import { GachaOutput } from 'src/static-table/draw/gacha_output/entities/gacha_output.entity';
import { UserGachaCheck } from 'src/supervisor/gacha_draw/user_gacha_check/entities/user_gacha_check.entity';
import { BountyStage } from 'src/static-table/stage/bounty_stage/entities/bounty_stage.entity';
import { UserDiamond } from 'src/inventory/diamond/user_diamond/entities/user_diamond.entity';
import { UserAchieveRanking } from 'src/inventory/achievement/user_achieve_ranking/entities/user_achieve_ranking.entity';
import { ShopPackage } from 'src/static-table/shop/shop_package/entities/shop_package.entity';
import { Shop } from 'src/static-table/shop/shop/entities/shop.entity';

export const entities = [
  Users,
  Item,
  ItemEquipslot,
  ItemGrade,
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
  DispatchTest,
  UserRentama,
  UserMemory,
  UserMemoryRent,
  Equip,
  EquipGrade,
  EquipLevel,
  EquipSkill,
  UserEquip,
  UserEquipSlot,
  EquipOption,
  UserEquipOption,
  Collection,
  CollectionSuit,
  CollectionNpc,
  CollectionBoss,
  CollectionEquip,
  CollectionBossMemory,
  ServerConfig,
  UserMission,
  UserAttendance,
  Attendance,
  SystemNotice,
  UserMail,
  AchieveList,
  UserAchievements,
  UserOfflineReward,
  UserCollection,
  UserNpcFriendship,
  ZLoginLog,
  Offline,
  Pass,
  PassSeason,
  PassMission,
  PassLevel,
  PassEdu,
  PassBounty,
  ItemExchange,
  SecameDiary,
  SecameMail,
  Membership,
  SuitOption,
  SuitSkill,
  UserItemExchange,
  UserSuit,
  UserSecameDiary,
  UserSecameMail,
  UserMembership,
  UserDispatch,
  UserDispatchRentama,
  UserBattlePass,
  UserBattlePassReward,
  UserMemorize,
  UserMemoryShare,
  BattleStage,
  RunStage,
  PuzzleStage,
  Suit,
  SuitLevel,
  SuitUltimate,
  SuitUltimateLevel,
  UserIngameReward,
  Skill,
  UserTutorial,
  TutorialReward,
  GachaOutput,
  UserGachaCheck,
  BountyStage,
  UserDiamond,
  UserAchieveRanking,
  ShopPackage,
  Shop,
];
