import { Module } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';
import { UserTunaTvOnlineController } from './user-tuna-tv-online.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';
import { UserTunaTv } from '../user_tuna_tv/entities/user_tuna_tv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTunaTvOnline, UserTunaTv])],
  exports: [UserTunaTvOnlineService],
  controllers: [UserTunaTvOnlineController],
  providers: [UserTunaTvOnlineService, UserTunaTvService],
})
export class UserTunaTvOnlineModule {}
