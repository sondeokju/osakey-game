import { Module } from '@nestjs/common';
import { UserSettingService } from './user_setting.service';
import { UserSettingController } from './user_setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMission } from 'src/inventory/mission/user_mission/entities/user_mission.entity';
import { UserMissionService } from 'src/inventory/mission/user_mission/user_mission.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMission])],
  exports: [UserSettingService],
  controllers: [UserSettingController],
  providers: [UserSettingService, UserMissionService],
})
export class UserSettingModule {}
