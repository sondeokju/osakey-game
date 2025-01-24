import { Module } from '@nestjs/common';
import { UserMemoryShareService } from './user_memory_share.service';
import { UserMemoryShareController } from './user_memory_share.controller';

@Module({
  controllers: [UserMemoryShareController],
  providers: [UserMemoryShareService],
})
export class UserMemoryShareModule {}
