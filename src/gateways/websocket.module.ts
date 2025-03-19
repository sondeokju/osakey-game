import { Module } from '@nestjs/common';
import { UserGateway } from './user/user.gateway';
import { UserModule } from './user/user.module';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, ZLoginLogModule, AuthModule],
  providers: [UserGateway], // ✅ UserGateway는 제외!
  exports: [UserGateway],
})
export class WebSocketModule {}
