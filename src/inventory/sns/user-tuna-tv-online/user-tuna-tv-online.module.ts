import { Module } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';
import { UserTunaTvOnlineController } from './user-tuna-tv-online.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';
import { UserTunaTv } from '../user_tuna_tv/entities/user_tuna_tv.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { UserSnsLikesService } from '../user_sns_likes/user_sns_likes.service';
import { UserSnsLikes } from '../user_sns_likes/entities/user_sns_likes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTunaTvOnline,
      UserTunaTv,
      SnsConfig,
      UserSnsLikes,
    ]),
  ],
  exports: [UserTunaTvOnlineService],
  controllers: [UserTunaTvOnlineController],
  providers: [
    UserTunaTvOnlineService,
    UserTunaTvService,
    SnsConfigService,
    UserSnsLikesService,
  ],
})
export class UserTunaTvOnlineModule {}
