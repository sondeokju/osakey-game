import { Module } from '@nestjs/common';
import { UserSettingService } from './user_setting.service';
import { UserSettingController } from './user_setting.controller';

@Module({
  controllers: [UserSettingController],
  providers: [UserSettingService],
})
export class UserSettingModule {}
