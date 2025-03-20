import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';
import { RedisModule } from 'src/redis/redis.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [ZLoginLogModule, RedisModule, GameLogsModule],
  providers: [UserGateway, UserService],
  exports: [UserService],
})
export class UserModule {}
