import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway implements OnGatewayConnection {
  //constructor(private readonly chatService: ChatService) {}

  handleConnection(socket: Socket) {
    console.log(`✅ User WebSocket 연결됨: ${socket.id}`);
  }

  @SubscribeMessage('message')
  sendMessage(@MessageBody() message: any) {
    console.log(`✅ send_message`);
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
  }
}
