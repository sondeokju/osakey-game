import { Module } from '@nestjs/common';
import { UserMissionService } from './user_mission.service';
import { UserMissionController } from './user_mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMission } from './entities/user_mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMission])],
  exports: [UserMissionService],
  controllers: [UserMissionController],
  providers: [UserMissionService],
})
export class UserMissionModule {}
