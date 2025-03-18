import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  // ws://localhost:3000/realtime
  namespace: 'realtime',
})
export class RealTimeGateway implements OnGatewayConnection {
  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  // sockt.on('send_mesage', (message)=>{console.log(message)}));
  // @SubscribeMessage('send_message')
  // sendMessage(@MessageBody() message: string) {
  //   console.log('send_message:', message.data);
  // }

  @SubscribeMessage('send_message')
  sendMessage(@MessageBody() message: any) {
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
