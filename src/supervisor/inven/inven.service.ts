import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAchievementsService } from 'src/inventory/achievement/user_achievements/user_achievements.service';
import { UserAttendanceService } from 'src/inventory/attendance/user_attendance/user_attendance.service';
import { UserBattlePassService } from 'src/inventory/battlepass/user_battle_pass/user_battle_pass.service';
import { UserBattlePassRewardService } from 'src/inventory/battlepass/user_battle_pass_reward/user_battle_pass_reward.service';
import { UserMemorizeService } from 'src/inventory/boss/user_memorize/user_memorize.service';
import { UserMemoryShareService } from 'src/inventory/boss/user_memory_share/user_memory_share.service';
import { UserCollectionService } from 'src/inventory/collection/user_collection/user_collection.service';
import { UserDispatchService } from 'src/inventory/dispatch/user_dispatch/user_dispatch.service';
import { UserDispatchRentamaService } from 'src/inventory/dispatch/user_dispatch_rentama/user_dispatch_rentama.service';
import { UserEquipService } from 'src/inventory/equipment/user_equip/user_equip.service';
import { UserEquipOptionService } from 'src/inventory/equipment/user_equip_option/user_equip_option.service';
import { UserEquipSlotService } from 'src/inventory/equipment/user_equip_slot/user_equip_slot.service';
import { UserItemExchangeService } from 'src/inventory/exchange/user_item_exchange/user_item_exchange.service';
import { UserMailService } from 'src/inventory/mail/user_mail/user_mail.service';
import { UserMembershipService } from 'src/inventory/membership/user_membership/user_membership.service';
import { UserMissionService } from 'src/inventory/mission/user_mission/user_mission.service';
import { UserNpcFriendshipService } from 'src/inventory/npc/user_npc_friendship/user_npc_friendship.service';
import { UserOfflineRewardService } from 'src/inventory/reward/user_offline_reward/user_offline_reward.service';
import { UserSecameDiaryService } from 'src/inventory/secame/user_secame_diary/user_secame_diary.service';
import { UserSecameMailService } from 'src/inventory/secame/user_secame_mail/user_secame_mail.service';
import { UserTunaTvOnlineService } from 'src/inventory/sns/user-tuna-tv-online/user-tuna-tv-online.service';
import { UserSnsFollowService } from 'src/inventory/sns/user_sns_follow/user_sns_follow.service';
import { UserSnsLevelService } from 'src/inventory/sns/user_sns_level/user_sns_level.service';
import { UserSnsRewardService } from 'src/inventory/sns/user_sns_reward/user_sns_reward.service';
import { UserTunaTvService } from 'src/inventory/sns/user_tuna_tv/user_tuna_tv.service';
import { UserIngameRewardService } from 'src/inventory/stage/user_ingame_reward/user_ingame_reward.service';
import { UserSuitService } from 'src/inventory/suit/user_suit/user_suit.service';
import { UserTutorialService } from 'src/inventory/tutorial/user_tutorial/user_tutorial.service';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class InvenService {
  constructor(
    private readonly userItemExchangeService: UserItemExchangeService,
    private readonly userSuitService: UserSuitService,
    private readonly userSecameDiaryService: UserSecameDiaryService,
    private readonly userSecameMailService: UserSecameMailService,
    private readonly userMembershipService: UserMembershipService,
    private readonly userDispatchService: UserDispatchService,
    private readonly userDispatchRentamaService: UserDispatchRentamaService,
    //private readonly userBattlePassService: UserBattlePassService,
    //private readonly userBattlePassRewardService: UserBattlePassRewardService,
    private readonly userMemorizeService: UserMemorizeService,
    private readonly userMemoryShareService: UserMemoryShareService,
    private readonly userIngameRewardService: UserIngameRewardService,
    private readonly userTunaTvService: UserTunaTvService,
    private readonly userSnsRewardService: UserSnsRewardService,
    private readonly userSnsLevelService: UserSnsLevelService,
    private readonly userSnsFollowService: UserSnsFollowService,
    //private readonly userTunaTvOnlineService: UserTunaTvOnlineService,
    private readonly userAchievementsService: UserAchievementsService,
    private readonly userOfflineRewardService: UserOfflineRewardService,
    private readonly userCollectionService: UserCollectionService,
    private readonly userNpcFriendshipService: UserNpcFriendshipService,
    private readonly userMailService: UserMailService,
    private readonly userMissionService: UserMissionService,
    private readonly userAttendanceService: UserAttendanceService,
    private readonly userEquipService: UserEquipService,
    private readonly userEquipSlotService: UserEquipSlotService,
    private readonly userEquipOptionService: UserEquipOptionService,
    private readonly userTutorialService: UserTutorialService,
  ) {}

  async getUserInventoryAll(user_id: string, qr?: QueryRunner) {
    const suit = await this.userSuitService.getUserSuit(user_id, qr);
    const itemExchange = await this.userItemExchangeService.getItemExchange(
      user_id,
      qr,
    );
    const secameDiary = await this.userSecameDiaryService.getUserSecameDiary(
      user_id,
      qr,
    );
    const secameMail = await this.userSecameMailService.getUserSecameMail(
      user_id,
      qr,
    );
    const membership = await this.userMembershipService.getUserMembership(
      user_id,
      qr,
    );
    const dispatch = await this.userDispatchService.getUserDispatch(
      user_id,
      qr,
    );
    const dispatchRentama =
      await this.userDispatchRentamaService.getUserDispatchRentama(user_id, qr);
    // const dispatchRentama =
    //   await this.userBattlePassService.(user_id, qr);

    const memorize = await this.userMemorizeService.getUserMemorize(
      user_id,
      qr,
    );
    const memorizeShare =
      await this.userMemoryShareService.getUserMemorizeShare(user_id, qr);
    const ingameReward = await this.userIngameRewardService.getIngameReward(
      user_id,
      qr,
    );
    const tunaTv = await this.userTunaTvService.TunaTvList(user_id, qr);
    //const snsReward = await this.userSnsRewardService.(user_id, qr);
    const snsLevel = await this.userSnsLevelService.getSnsLevelAll(user_id, qr);
    const follow = await this.userSnsFollowService.getUserFollowAll(
      user_id,
      qr,
    );
    const achieve = await this.userAchievementsService.getUserAchieveAll(
      user_id,
      qr,
    );
    const offlineReward =
      await this.userOfflineRewardService.getUserOfflineRewardAll(user_id, qr);
    const collection = await this.userCollectionService.userCollectionList(
      user_id,
      qr,
    );
    const npcFriendship =
      await this.userNpcFriendshipService.getUserNpcFriendship(user_id, qr);
    const mail = await this.userMailService.getUserMailAll(user_id, qr);
    const mission = await this.userMissionService.missionList(user_id, qr);
    const attendance = await this.userAttendanceService.getAttendanceAll(
      user_id,
      qr,
    );
    const equip = await this.userEquipService.equipList(user_id, qr);
    const equipSlot = await this.userEquipSlotService.getEquipSlot(user_id, qr);
    const equipOption = await this.userEquipOptionService.equipOptionList(
      user_id,
      qr,
    );

    const tutorial = await this.userTutorialService.getUserTutorialAll(
      user_id,
      qr,
    );

    const inven = {
      suit,
      itemExchange,
      secameDiary,
      secameMail,
      membership,
      dispatch,
      dispatchRentama,
      memorize,
      memorizeShare,
      ingameReward,
      tunaTv,
      snsLevel,
      follow,
      achieve,
      offlineReward,
      collection,
      npcFriendship,
      mail,
      mission,
      attendance,
      equip,
      equipSlot,
      equipOption,
      tutorial,
    };

    return inven;
  }
}
