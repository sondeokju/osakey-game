import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway implements OnGatewayConnection {
  //@WebSocketServer() server: Server;

  handleConnection(socket: Socket) {
    console.log(`✅ User WebSocket 연결됨 1: ${socket.id}`);

    // ✅ 클라이언트에게 연결 성공 메시지 전송
    // socket.emit('message', {
    //   message: 'Welcome to the WebSocket server!',
    // });
  }

  @SubscribeMessage('message')
  sendMessage(@MessageBody() message: any) {
    console.log(`✅ 메시지 수신:`, message);

    // 모든 클라이언트에게 메시지 브로드캐스트
    // this.server.emit('message', {
    //   message: `서버에서 받은 메시지: ${message.data}`,
    // });
  }
}
