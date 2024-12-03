import { Module } from '@nestjs/common';
import { UserMemoryService } from './user_memory.service';
import { UserMemoryController } from './user_memory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMemory } from './entities/user_memory.entity';
import { UserSnsFollow } from 'src/inventory/sns/user_sns_follow/entities/user_sns_follow.entity';
import { UserSnsFollowService } from 'src/inventory/sns/user_sns_follow/user_sns_follow.service';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMemory, UserSnsFollow, SnsConfig])],
  exports: [UserMemoryService],
  controllers: [UserMemoryController],
  providers: [UserMemoryService, UserSnsFollowService, SnsConfigService],
})
export class UserMemoryModule {}
