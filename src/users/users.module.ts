import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { UserMissionModule } from 'src/inventory/mission/user_mission/user_mission.module';
import { UserMissionService } from 'src/inventory/mission/user_mission/user_mission.service';
import { UserMission } from 'src/inventory/mission/user_mission/entities/user_mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Hero, UserMission])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, HeroService, UserMissionService],
})
export class UsersModule {}
