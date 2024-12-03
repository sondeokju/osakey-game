import { Module } from '@nestjs/common';
import { UserMemoryService } from './user_memory.service';
import { UserMemoryController } from './user_memory.controller';

@Module({
  controllers: [UserMemoryController],
  providers: [UserMemoryService],
})
export class UserMemoryModule {}
