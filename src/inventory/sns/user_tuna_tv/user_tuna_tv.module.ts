import { Module } from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';
import { UserTunaTvController } from './user_tuna_tv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTv } from './entities/user_tuna_tv.entity';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { UserSnsLikesService } from '../user_sns_likes/user_sns_likes.service';
import { UserSnsLikes } from '../user_sns_likes/entities/user_sns_likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTunaTv, SnsConfig, UserSnsLikes])],
  exports: [UserTunaTvService],
  controllers: [UserTunaTvController],
  providers: [UserTunaTvService, SnsConfigService, UserSnsLikesService],
})
export class UserTunaTvModule {}
