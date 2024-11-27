import { Module } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';
import { UserTunaTvOnlineController } from './user-tuna-tv-online.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTunaTvOnline])],
  exports: [UserTunaTvOnlineService],
  controllers: [UserTunaTvOnlineController],
  providers: [UserTunaTvOnlineService, UserTunaTvService],
})
export class UserTunaTvOnlineModule {}
