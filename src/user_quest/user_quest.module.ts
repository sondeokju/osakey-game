import { Module } from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { UserQuestController } from './user_quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { RewardGroupService } from 'src/static-table/reward_group/reward_group.service';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuest])],
  exports: [UserQuestService],
  controllers: [UserQuestController],
  providers: [UserQuestService, RewardGroupService, MissionRoutineService],
})
export class UserQuestModule {}
