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
  @WebSocketServer() server: Server;

  handleConnection(socket: Socket) {
    console.log(`✅ User WebSocket 연결됨 1: ${socket.id}`);

    // ✅ Postman과 같은 기본 WebSocket 클라이언트에서도 받을 수 있도록 send() 사용
    socket.send(
      JSON.stringify({
        message: 'Welcome to the WebSocket server!',
      }),
    );
  }

  @SubscribeMessage('message')
  sendMessage(socket: Socket, @MessageBody() message: any) {
    //console.log(`✅ 메시지 수신:`, message);

    if (typeof message === 'string') {
      try {
        const parsedMessage = JSON.parse(message);
        console.log('send_message:', parsedMessage.data);
      } catch (error) {
        console.error('Invalid JSON string:', message);
      }
    } else if (typeof message === 'object' && message !== null) {
      console.log('send_message:', message.data);
    } else {
      console.error('Unexpected message format:', message);
    }

    socket.send(
      JSON.stringify({
        message: `서버에서 받은 메시지: ${message.data}`,
      }),
    );

    // 모든 클라이언트에게 메시지 브로드캐스트
    // this.server.emit('message', {
    //   message: `서버에서 받은 메시지: ${message.data}`,
    // });
  }
}
