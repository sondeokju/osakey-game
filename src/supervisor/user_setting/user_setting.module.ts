import { Module } from '@nestjs/common';
import { UserSettingService } from './user_setting.service';
import { UserSettingController } from './user_setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMissionModule } from 'src/inventory/mission/user_mission/user_mission.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), UserMissionModule],
  exports: [UserSettingService],
  controllers: [UserSettingController],
  providers: [UserSettingService],
})
export class UserSettingModule {}
