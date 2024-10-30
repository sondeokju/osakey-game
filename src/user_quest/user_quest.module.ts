import { Module } from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { UserQuestController } from './user_quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuest } from './entity/user_quest.entity';
import { MissionRoutineService } from 'src/static-table/mission_routine/mission_routine.service';
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
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserQuest,
      Reward,
      MissionRoutine,
      Item,
      Mission,
      MissionKind,
      MissionMain,
      MissionRoutine,
      MissionRoutineBonus,
      MissionSub,
      UserItem,
      Users,
      Hero,
    ]),
  ],
  exports: [UserQuestService],
  controllers: [UserQuestController],
  providers: [
    UserQuestService,
    RewardService,
    ItemService,
    MissionService,
    MissionKindService,
    MissionMainService,
    MissionRoutineService,
    MissionRoutineBonusService,
    MissionSubService,
    UserItemService,
    UsersService,
    HeroService,
    RewardService,
    RewardOfferService,
  ],
})
export class UserQuestModule {}
