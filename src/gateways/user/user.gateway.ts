import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
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
  sendMessage(
    @ConnectedSocket() client: Socket, // ✅ `@ConnectedSocket()`으로 명확하게 선언
    @MessageBody() message: any,
  ) {
    console.log('✅ 메시지 이벤트 수신!');
    //console.log('📌 socket 객체 확인:', client); // 이제 client가 정상적으로 출력됨

    if (!client) {
      console.error('⛔ client 객체가 undefined 상태입니다!');
      return;
    }

    console.log(`✅ message 메시지 수신:`, message);

    client.emit('message', {
      message: `서버에서 받은 메시지: ${message?.data || message}`,
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
