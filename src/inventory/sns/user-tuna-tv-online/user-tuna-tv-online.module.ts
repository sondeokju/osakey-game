import { Module } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';
import { UserTunaTvOnlineController } from './user-tuna-tv-online.controller';

@Module({
  controllers: [UserTunaTvOnlineController],
  providers: [UserTunaTvOnlineService],
})
export class UserTunaTvOnlineModule {}
