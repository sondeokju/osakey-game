import { Module } from '@nestjs/common';
import { UserGateway } from './user/user.gateway';

@Module({
  providers: [UserGateway], // ✅ UserGateway는 제외!
  exports: [UserGateway],
})
export class WebSocketModule {}
