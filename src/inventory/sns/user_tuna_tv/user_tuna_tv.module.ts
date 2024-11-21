import { Module } from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';
import { UserTunaTvController } from './user_tuna_tv.controller';

@Module({
  controllers: [UserTunaTvController],
  providers: [UserTunaTvService],
})
export class UserTunaTvModule {}
