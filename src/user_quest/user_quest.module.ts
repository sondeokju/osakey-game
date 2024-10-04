import { Module } from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { UserQuestController } from './user_quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { RewardGroupService } from 'src/static-table/reward_group/reward_group.service';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
import { RewardGroup } from 'src/static-table/reward_group/entities/reward_group.entity';
import { MissionRoutine } from 'src/static-table/mission_routine/entities/mission_routine.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { MissionService } from 'src/static-table/mission/mission.service';
import { Mission } from 'src/static-table/mission/entities/mission.entity';
import { MissionKind } from 'src/static-table/mission_kind/entities/mission_kind.entity';
import { MissionMain } from 'src/static-table/mission_main/entities/mission_main.entity';
import { MissionRoutineBonus } from 'src/static-table/mission_routine_bonus/entities/mission_routine_bonus.entity';
import { MissionSub } from 'src/static-table/mission_sub/entities/mission_sub.entity';
import { MissionKindService } from 'src/static-table/mission_kind/mission_kind.service';
import { MissionMainService } from 'src/static-table/mission_main/mission_main.service';
import { MissionRoutineBonusService } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.service';
import { MissionSubService } from 'src/static-table/mission_sub/mission_sub.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserQuest,
      RewardGroup,
      MissionRoutine,
      Item,
      Mission,
      MissionKind,
      MissionMain,
      MissionRoutine,
      MissionRoutineBonus,
      MissionSub,
    ]),
  ],
  exports: [UserQuestService],
  controllers: [UserQuestController],
  providers: [
    UserQuestService,
    RewardGroupService,
    ItemService,
    MissionService,
    MissionKindService,
    MissionMainService,
    MissionRoutineService,
    MissionRoutineBonusService,
    MissionSubService,
  ],
})
export class UserQuestModule {}
