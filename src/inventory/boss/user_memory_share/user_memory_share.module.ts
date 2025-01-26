import { Module } from '@nestjs/common';
import { UserMemoryShareService } from './user_memory_share.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMemoryShare } from './entities/user_memory_share.entity';
import { UserMemoryShareController } from './user_memory_share.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserMemoryShare])],
  exports: [UserMemoryShareService],
  controllers: [UserMemoryShareController],
  providers: [UserMemoryShareService],
})
export class UserMemoryShareModule {}
