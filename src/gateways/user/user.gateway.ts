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
    socket.emit('message', {
      message: 'Welcome to the WebSocket server!',
    });
  }

  @SubscribeMessage('message')
  sendMessage(socket: Socket, @MessageBody() message: any) {
    console.log('✅ 메시지 이벤트 수신!');
    console.log('📌 socket 객체 확인:', socket);

    if (!socket) {
      console.error('⛔ socket 객체가 undefined 상태입니다!');
      return;
    }

    // ✅ 특정 클라이언트에게 응답
    socket.emit('message', {
      message: `서버에서 받은 메시지: ${message?.data || message}`,
    });

    // ✅ 전체 클라이언트에게 메시지 브로드캐스트
    this.server.emit('message', {
      message: `Broadcast: ${message?.data || message}`,
    });
  }

  // @SubscribeMessage('message')
  // sendMessage(client: Socket, @MessageBody() message: any) {
  //   console.log(`✅ 메시지 수신:`, message);

  //   let responseMessage: string;

  //   if (typeof message === 'string') {
  //     try {
  //       const parsedMessage = JSON.parse(message);
  //       responseMessage = `서버에서 받은 메시지: ${parsedMessage.data}`;
  //       console.log('send_message:', parsedMessage.data);
  //     } catch (error) {
  //       responseMessage = 'Invalid JSON format';
  //       console.error('Invalid JSON string:', message);
  //     }
  //   } else if (typeof message === 'object' && message !== null) {
  //     responseMessage = `서버에서 받은 메시지: ${message.data}`;
  //     console.log('send_message:', message.data);
  //   } else {
  //     responseMessage = 'Unexpected message format';
  //     console.error('Unexpected message format:', message);
  //   }

  //   // ✅ `send()` 대신 `emit()` 사용하여 클라이언트에게 응답 전송
  //   client.emit('message', { message: responseMessage });
  // }
}

// 모든 클라이언트에게 메시지 브로드캐스트
// this.server.emit('message', {
//   message: `서버에서 받은 메시지: ${message.data}`,
// });
