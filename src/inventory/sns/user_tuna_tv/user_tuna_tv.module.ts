import { Module } from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';
import { UserTunaTvController } from './user_tuna_tv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTv } from './entities/user_tuna_tv.entity';
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLikesService } from '../sns_likes/sns_likes.service';
import { SnsLikes } from '../sns_likes/entities/sns_likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTunaTv, SnsConfig, SnsLikes])],
  exports: [UserTunaTvService],
  controllers: [UserTunaTvController],
  providers: [UserTunaTvService, SnsConfigService, SnsLikesService],
})
export class UserTunaTvModule {}
