import { Module } from '@nestjs/common';

import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSnsFollow } from './entities/user_sns_follow.entity';
import { UserSnsFollowService } from './user_sns_follow.service';
import { UserSnsFollowController } from './user_sns_follow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSnsFollow, SnsConfig])],
  exports: [UserSnsFollowService],
  controllers: [UserSnsFollowController],
  providers: [UserSnsFollowService, SnsConfigService],
})
export class UserSnsFollowModule {}
