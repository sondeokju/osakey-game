import { Module } from '@nestjs/common';
import { UserIngameLogService } from './user_ingame_log.service';
import { UserIngameLogController } from './user_ingame_log.controller';

@Module({
  controllers: [UserIngameLogController],
  providers: [UserIngameLogService],
})
export class UserIngameLogModule {}
