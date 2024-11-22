import { Module } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';
import { UserTunaTvOnlineController } from './user-tuna-tv-online.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTunaTvOnline])],
  exports: [UserTunaTvOnlineService],
  controllers: [UserTunaTvOnlineController],
  providers: [UserTunaTvOnlineService],
})
export class UserTunaTvOnlineModule {}
