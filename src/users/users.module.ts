import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { UserMissionModule } from 'src/inventory/mission/user_mission/user_mission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Hero]), UserMissionModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, HeroService],
})
export class UsersModule {}
