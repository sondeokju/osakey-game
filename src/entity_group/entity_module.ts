import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { LogUrlModule } from 'src/common/log_url/log_url.module';
import { UserEduStatsModule } from 'src/inventory/edu/user_edu_stats/user_edu_stats.module';
import { UserTunaTvOnlineModule } from 'src/inventory/sns/user-tuna-tv-online/user-tuna-tv-online.module';
import { UserSnsFollowModule } from 'src/inventory/sns/user_sns_follow/user_sns_follow.module';
import { UserSnsLevelModule } from 'src/inventory/sns/user_sns_level/user_sns_level.module';
import { UserSnsRewardModule } from 'src/inventory/sns/user_sns_reward/user_sns_reward.module';
import { UserTunaTvModule } from 'src/inventory/sns/user_tuna_tv/user_tuna_tv.module';
import { RealtimeModule } from 'src/SocketIO/realtime/realtime.module';
import { ControlTableModule } from 'src/static-table/control_table/control_table.module';
import { DispatchModule } from 'src/static-table/dispatch/dispatch/dispatch.module';
import { DispatchConfigModule } from 'src/static-table/dispatch/dispatch_config/dispatch_config.module';
import { DispatchEquipGradeModule } from 'src/static-table/dispatch/dispatch_equip_grade/dispatch_equip_grade.module';
import { DispatchEquipLevelModule } from 'src/static-table/dispatch/dispatch_equip_level/dispatch_equip_level.module';
import { DispatchUpgradeModule } from 'src/static-table/dispatch/dispatch_upgrade/dispatch_upgrade.module';
import { EduModule } from 'src/static-table/edu/edu/edu.module';
import { EduCurriculumModule } from 'src/static-table/edu/edu_curriculum/edu_curriculum.module';
import { EduListModule } from 'src/static-table/edu/edu_list/edu_list.module';
import { EduReduceTime } from 'src/static-table/edu/edu_reduce_time/entities/edu_reduce_time.entity';
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
import { UserBattleModule } from 'src/inventory/battle/user_battle/user_battle.module';
import { UserItemModule } from 'src/user_item/user_item.module';
import { UserQuestModule } from 'src/user_quest/user_quest.module';
import { UsersModule } from 'src/users/users.module';
import { UserSnsLikesModule } from 'src/inventory/sns/user_sns_likes/user_sns_likes.module';
import { UserRentamaModule } from 'src/inventory/dispatch/user_rentama/user_rentama.module';
import { DispatchTestModule } from 'src/static-table/dispatch/dispatch_test/dispatch_test.module';
import { UserMemoryModule } from 'src/inventory/boss/user_memory/user_memory.module';
import { UserMemoryRentModule } from 'src/inventory/boss/user_memory_rent/user_memory_rent.module';
import { EquipModule } from 'src/static-table/equipment/equip/equip.module';
import { EquipGradeModule } from 'src/static-table/equipment/equip_grade/equip_grade.module';
import { EquipLevelModule } from 'src/static-table/equipment/equip_level/equip_level.module';
import { EquipSkillModule } from 'src/static-table/equipment/equip_skill/equip_skill.module';
import { UserEquipModule } from 'src/inventory/equipment/user_equip/user_equip.module';
import { UserEquipSlotModule } from 'src/inventory/equipment/user_equip_slot/user_equip_slot.module';
import { EquipOptionModule } from 'src/static-table/equipment/equip_option/equip_option.module';
import { UserEquipOptionModule } from 'src/inventory/equipment/user_equip_option/user_equip_option.module';
import { CollectionModule } from 'src/static-table/collection/collection/collection.module';
import { CollectionBossModule } from 'src/static-table/collection/collection_boss/collection_boss.module';
import { CollectionEquipModule } from 'src/static-table/collection/collection_equip/collection_equip.module';
import { CollectionNpcModule } from 'src/static-table/collection/collection_npc/collection_npc.module';
import { CollectionSuitModule } from 'src/static-table/collection/collection_suit/collection_suit.module';
import { ServerConfigModule } from 'src/static-table/config/server_config/server_config.module';
import { CollectionBossMemoryModule } from 'src/static-table/collection/collection_boss_memory/collection_boss_memory.module';
import { UserMissionModule } from 'src/inventory/mission/user_mission/user_mission.module';
import { UserAttendanceModule } from 'src/inventory/attendance/user_attendance/user_attendance.module';
import { AttendanceModule } from 'src/static-table/attendance/attendance/attendance.module';
import { SystemNoticeModule } from 'src/static-table/config/system_notice/system_notice.module';
import { UserMailModule } from 'src/inventory/mail/user_mail/user_mail.module';
import { AchieveListModule } from 'src/static-table/achieve/achieve_list/achieve_list.module';
import { UserAchievementsModule } from 'src/inventory/achievement/user_achievements/user_achievements.module';
import { UserIngameLogModule } from 'src/inventory/reward/user_ingame_log/user_ingame_log.module';
import { UserIngameRewardModule } from 'src/inventory/reward/user_ingame_reward/user_ingame_reward.module';
import { UserOfflineRewardModule } from 'src/inventory/reward/user_offline_reward/user_offline_reward.module';
import { UserCollectionModule } from 'src/inventory/collection/user_collection/user_collection.module';
import { UserNpcFriendshipModule } from 'src/inventory/npc/user_npc_friendship/user_npc_friendship.module';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';
import { OfflineModule } from 'src/static-table/offline/offline/offline.module';
import { PassModule } from 'src/static-table/battlepass/pass/pass.module';
import { PassBountyModule } from 'src/static-table/battlepass/pass_bounty/pass_bounty.module';
import { PassEduModule } from 'src/static-table/battlepass/pass_edu/pass_edu.module';
import { PassLevelModule } from 'src/static-table/battlepass/pass_level/pass_level.module';
import { PassMissionModule } from 'src/static-table/battlepass/pass_mission/pass_mission.module';
import { PassSeasonModule } from 'src/static-table/battlepass/pass_season/pass_season.module';
import { ItemExchangeModule } from 'src/static-table/exchange/item_exchange/item_exchange.module';
import { SecameDiaryModule } from 'src/static-table/secame/secame_diary/secame_diary.module';
import { SecameMailModule } from 'src/static-table/secame/secame_mail/secame_mail.module';

export const entities_module = [
  UsersModule,
  AuthModule,
  CommonModule,
  ItemModule,
  ItemEquipslotModule,
  ItemGradeModule,
  GachaModule,
  UserItemModule,
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
  UserTunaTvOnlineModule,
  EduModule,
  EduCurriculumModule,
  EduListModule,
  EduReduceTime,
  DispatchModule,
  DispatchUpgradeModule,
  DispatchEquipLevelModule,
  DispatchEquipGradeModule,
  DispatchConfigModule,
  UserEduStatsModule,
  UserSnsLikesModule,
  UserRentamaModule,
  DispatchTestModule,
  UserMemoryModule,
  UserMemoryRentModule,
  EquipModule,
  EquipSkillModule,
  EquipLevelModule,
  EquipGradeModule,
  UserEquipModule,
  UserEquipSlotModule,
  EquipOptionModule,
  UserEquipOptionModule,
  CollectionModule,
  CollectionSuitModule,
  CollectionNpcModule,
  CollectionEquipModule,
  CollectionBossModule,
  CollectionBossMemoryModule,
  ServerConfigModule,
  UserMissionModule,
  UserAttendanceModule,
  AttendanceModule,
  SystemNoticeModule,
  UserMailModule,
  AchieveListModule,
  UserAchievementsModule,
  UserOfflineRewardModule,
  UserIngameRewardModule,
  UserIngameLogModule,
  UserCollectionModule,
  UserNpcFriendshipModule,
  ZLoginLogModule,
  OfflineModule,
  PassModule,
  PassLevelModule,
  PassMissionModule,
  PassEduModule,
  PassBountyModule,
  PassSeasonModule,
  ItemExchangeModule,
  SecameDiaryModule,
  SecameMailModule,
];
