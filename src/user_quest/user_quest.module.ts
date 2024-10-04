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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserQuest,
      RewardGroup,
      MissionRoutine,
      Item,
      Mission,
    ]),
  ],
  exports: [UserQuestService],
  controllers: [UserQuestController],
  providers: [
    UserQuestService,
    RewardGroupService,
    MissionRoutineService,
    ItemService,
    MissionService,
  ],
})
export class UserQuestModule {}
