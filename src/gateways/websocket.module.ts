import { Module, OnModuleInit } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces';
import { WebSocketGateway } from '@nestjs/websockets';

//const GATEWAYS = ['chat', 'game', 'notification', 'user', 'matchmaking'];
const GATEWAYS = ['user'];

@Module({})
export class WebSocketModule implements OnModuleInit {
  static register(): DynamicModule {
    const gateways = GATEWAYS.map((namespace) => {
      @WebSocketGateway({ namespace })
      class DynamicGateway {
        handleConnection(socket) {
          console.log(`✅ ${namespace} WebSocket 연결됨 2: ${socket.id}`);
        }
      }
      return DynamicGateway;
    });

    return {
      module: WebSocketModule,
      providers: gateways,
      exports: gateways,
    };
  }

  onModuleInit() {
    console.log('✅ WebSocket 모듈이 초기화되었습니다.');
  }
}
