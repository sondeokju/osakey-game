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
  ],
})
export class ControlTableModule {}
