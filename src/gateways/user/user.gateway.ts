import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user.service';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedClients = new Map<string, Socket>(); // ✅ 중복 연결 방지

  constructor(private readonly userService: UserService) {}

  handleConnection(socket: Socket) {
    console.log(`✅ WebSocket 1`);
    console.log(
      'this.connectedClients.has(socket.id)',
      this.connectedClients.has(socket.id),
    );
    if (this.connectedClients.has(socket.id)) {
      console.log(`⛔ 이미 연결된 WebSocket: ${socket.id}`);
      return;
    }

    console.log(`✅ WebSocket 2`);

    this.connectedClients.set(socket.id, socket);

    console.log(`✅ WebSocket 연결됨: ${socket.id}`);
    // console.log(
    //   `✅ connectedClients :`,
    //   Array.from(this.connectedClients.entries()),
    // );

    // socket.emit('message', {
    //   message: 'Welcome to the WebSocket server!',
    // });
  }

  handleDisconnect(socket: Socket) {
    if (this.connectedClients.has(socket.id)) {
      this.connectedClients.delete(socket.id);
      console.log(`⛔ WebSocket 연결 종료: ${socket.id}`);
    }
  }

  @SubscribeMessage('message')
  sendMessage(
    @ConnectedSocket() client: Socket, // ✅ `@ConnectedSocket()`으로 명확하게 선언
    @MessageBody() message: any,
  ) {
    console.log('✅ 메시지 이벤트 수신!');

    if (!client) {
      console.error('⛔ client 객체가 undefined 상태입니다!');
      return;
    }

    console.log(`✅ message 메시지 수신:`, message);

    client.emit('message', {
      message: `서버에서 받은 메시지: ${message?.data || message}`,
    });
  }
}
