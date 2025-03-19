import { Module } from '@nestjs/common';
import { UserGateway } from './user/user.gateway';
import { UserModule } from './user/user.module';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';
import { ZLoginLogService } from 'src/game_log/login/z_login_log/z_login_log.service';

@Module({
  imports: [UserModule, ZLoginLogModule],
  providers: [UserGateway, ZLoginLogService], // ✅ UserGateway는 제외!
  exports: [UserGateway],
})
export class WebSocketModule {}
