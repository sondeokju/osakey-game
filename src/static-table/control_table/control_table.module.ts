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
  ],
})
export class ControlTableModule {}
