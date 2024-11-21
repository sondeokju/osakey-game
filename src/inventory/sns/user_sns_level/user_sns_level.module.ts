import { Module } from '@nestjs/common';
import { UserSnsLevelService } from './user_sns_level.service';
import { UserSnsLevelController } from './user_sns_level.controller';

@Module({
  controllers: [UserSnsLevelController],
  providers: [UserSnsLevelService],
})
export class UserSnsLevelModule {}
