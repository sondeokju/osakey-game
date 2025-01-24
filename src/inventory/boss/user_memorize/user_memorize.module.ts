import { Module } from '@nestjs/common';
import { UserMemorizeService } from './user_memorize.service';
import { UserMemorizeController } from './user_memorize.controller';

@Module({
  controllers: [UserMemorizeController],
  providers: [UserMemorizeService],
})
export class UserMemorizeModule {}
