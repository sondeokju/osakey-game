import { Module } from '@nestjs/common';
import { UserMemoryShareService } from './user_memory_share.service';
import { UserMemoryShareController } from './user_memory_share.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMemoryShare } from './entities/user_memory_share.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMemoryShare])],
  exports: [UserMemoryShareService],
  controllers: [UserMemoryShareController],
  providers: [UserMemoryShareService],
})
export class UserMemoryShareModule {}
