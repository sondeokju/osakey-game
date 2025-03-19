import { Module } from '@nestjs/common';
import { UserGateway } from './user/user.gateway';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserGateway], // ✅ UserGateway는 제외!
  exports: [UserGateway],
})
export class WebSocketModule {}
