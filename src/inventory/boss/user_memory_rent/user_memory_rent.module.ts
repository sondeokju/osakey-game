import { Module } from '@nestjs/common';
import { UserMemoryRentService } from './user_memory_rent.service';
import { UserMemoryRentController } from './user_memory_rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMemoryRent } from './entities/user_memory_rent.entity';
import { UserMemory } from '../user_memory/entities/user_memory.entity';
import { UserMemoryService } from '../user_memory/user_memory.service';
import { UserSnsFollowService } from 'src/inventory/sns/user_sns_follow/user_sns_follow.service';
import { UserSnsFollow } from 'src/inventory/sns/user_sns_follow/entities/user_sns_follow.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserMemoryRent,
      UserMemory,
      UserSnsFollow,
      SnsConfig,
    ]),
  ],
  exports: [UserMemoryRentService],
  controllers: [UserMemoryRentController],
  providers: [
    UserMemoryRentService,
    UserMemoryService,
    UserSnsFollowService,
    SnsConfigService,
  ],
})
export class UserMemoryRentModule {}
