import { Module } from '@nestjs/common';
import { UserDispatchService } from './user_dispatch.service';
import { UserDispatchController } from './user_dispatch.controller';

@Module({
  controllers: [UserDispatchController],
  providers: [UserDispatchService],
})
export class UserDispatchModule {}
