import { Module } from '@nestjs/common';
import { InvenService } from './inven.service';
import { InvenController } from './inven.controller';
import { UserSuitModule } from 'src/inventory/suit/user_suit/user_suit.module';
import { UserAchievementsModule } from 'src/inventory/achievement/user_achievements/user_achievements.module';
import { UserAttendanceModule } from 'src/inventory/attendance/user_attendance/user_attendance.module';
import { UserBattlePassModule } from 'src/inventory/battlepass/user_battle_pass/user_battle_pass.module';
import { UserBattlePassRewardModule } from 'src/inventory/battlepass/user_battle_pass_reward/user_battle_pass_reward.module';
import { UserMemorizeModule } from 'src/inventory/boss/user_memorize/user_memorize.module';
import { UserMemoryShareModule } from 'src/inventory/boss/user_memory_share/user_memory_share.module';
import { UserCollectionModule } from 'src/inventory/collection/user_collection/user_collection.module';
import { UserDispatchModule } from 'src/inventory/dispatch/user_dispatch/user_dispatch.module';
import { UserDispatchRentamaModule } from 'src/inventory/dispatch/user_dispatch_rentama/user_dispatch_rentama.module';
import { UserEquipModule } from 'src/inventory/equipment/user_equip/user_equip.module';
import { UserEquipOptionModule } from 'src/inventory/equipment/user_equip_option/user_equip_option.module';
import { UserEquipSlotModule } from 'src/inventory/equipment/user_equip_slot/user_equip_slot.module';
import { UserItemExchangeModule } from 'src/inventory/exchange/user_item_exchange/user_item_exchange.module';
import { UserMailModule } from 'src/inventory/mail/user_mail/user_mail.module';
import { UserMembershipModule } from 'src/inventory/membership/user_membership/user_membership.module';
import { UserMissionModule } from 'src/inventory/mission/user_mission/user_mission.module';
import { UserNpcFriendshipModule } from 'src/inventory/npc/user_npc_friendship/user_npc_friendship.module';
import { UserOfflineRewardModule } from 'src/inventory/reward/user_offline_reward/user_offline_reward.module';
import { UserSecameDiaryModule } from 'src/inventory/secame/user_secame_diary/user_secame_diary.module';
import { UserSecameMailModule } from 'src/inventory/secame/user_secame_mail/user_secame_mail.module';
import { UserTunaTvOnlineModule } from 'src/inventory/sns/user-tuna-tv-online/user-tuna-tv-online.module';
import { UserSnsFollowModule } from 'src/inventory/sns/user_sns_follow/user_sns_follow.module';
import { UserSnsLevelModule } from 'src/inventory/sns/user_sns_level/user_sns_level.module';
import { UserSnsRewardModule } from 'src/inventory/sns/user_sns_reward/user_sns_reward.module';
import { UserTunaTvModule } from 'src/inventory/sns/user_tuna_tv/user_tuna_tv.module';
import { UserIngameRewardModule } from 'src/inventory/stage/user_ingame_reward/user_ingame_reward.module';
//import { entities_module } from 'src/entity_group/entity_module';

// console.log('[DEBUG] imported entities_module:', entities_module);
// console.log('Type:', typeof entities_module);
// console.log('Is Array:', Array.isArray(entities_module));

@Module({
  imports: [
    UserItemExchangeModule,
    UserSuitModule,
    UserSecameDiaryModule,
    UserSecameMailModule,
    UserMembershipModule,
    UserDispatchModule,
    UserDispatchRentamaModule,
    //UserBattlePassModule,
    //UserBattlePassRewardModule,
    UserMemorizeModule,
    UserMemoryShareModule,
    UserIngameRewardModule,
    UserTunaTvModule,
    UserSnsRewardModule,
    UserSnsLevelModule,
    UserSnsFollowModule,
    UserTunaTvOnlineModule,
    UserAchievementsModule,
    UserOfflineRewardModule,
    UserCollectionModule,
    UserNpcFriendshipModule,
    UserMailModule,
    UserMissionModule,
    UserAttendanceModule,
    UserEquipModule,
    UserEquipSlotModule,
    UserEquipOptionModule,
  ],
  exports: [InvenService],
  controllers: [InvenController],
  providers: [InvenService],
})
export class InvenModule {}
