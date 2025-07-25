import { Module } from '@nestjs/common';
import { UserAttendanceService } from './user_attendance.service';
import { UserAttendanceController } from './user_attendance.controller';
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
import { UserAttendance } from './entities/user_attendance.entity';
import { AttendanceService } from 'src/static-table/attendance/attendance/attendance.service';
import { Attendance } from 'src/static-table/attendance/attendance/entities/attendance.entity';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAttendance,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
      Attendance,
    ]),
    GameLogsModule,
  ],
  exports: [UserAttendanceService],
  controllers: [UserAttendanceController],
  providers: [
    UserAttendanceService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
    AttendanceService,
  ],
})
export class UserAttendanceModule {}
