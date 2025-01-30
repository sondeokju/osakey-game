import { Module } from '@nestjs/common';
import { UserMissionService } from './user_mission.service';
import { UserMissionController } from './user_mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMission } from './entities/user_mission.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserMission,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
    ]),
    UsersModule,
  ],
  exports: [UserMissionService],
  controllers: [UserMissionController],
  providers: [
    UserMissionService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
  ],
})
export class UserMissionModule {}
