import { Module } from '@nestjs/common';
import { UserGateway } from './user/user.gateway';
import { UserModule } from './user/user.module';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';
import { RedisModule } from 'src/redis/redis.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [UserModule, ZLoginLogModule, RedisModule, GameLogsModule],
  providers: [UserGateway], // ✅ UserGateway는 제외!
  exports: [UserGateway],
})
export class WebSocketModule {}
