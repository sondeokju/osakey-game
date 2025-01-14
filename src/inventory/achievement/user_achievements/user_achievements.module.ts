import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { UserAchievementsService } from './user_achievements.service';
import { UserAchievementsController } from './user_achievements.controller';
import { UserAchievements } from './entities/user_achievements.entity';
import { AttendanceService } from 'src/static-table/attendance/attendance/attendance.service';
import { Attendance } from 'src/static-table/attendance/attendance/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAchievements,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
      Attendance,
    ]),
  ],
  exports: [UserAchievementsService],
  controllers: [UserAchievementsController],
  providers: [
    UserAchievementsService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
    AttendanceService,
  ],
})
export class UserAchievementsModule {}
