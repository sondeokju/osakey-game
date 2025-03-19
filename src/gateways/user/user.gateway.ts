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
import { ZLoginLogService } from 'src/game_log/login/z_login_log/z_login_log.service';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedClients = new Map<
    string,
    { socket: Socket; userId: string }
  >(); // ✅ 올바른 타입 지정

  constructor(
    private readonly userService: UserService,
    private readonly zLoginLogService: ZLoginLogService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    console.log(`✅ WebSocket 1`);

    // 헤더에서 accessToken 가져오기 (소문자로 접근)
    // const token =
    //   socket.handshake.headers['token'] ||
    //   socket.handshake.headers['authorization'];
    const rawToken = socket.handshake.headers['token'] as string;
    console.log('rawToken:', rawToken);
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    console.log('token:', token);

    let userId = '';

    if (token) {
      try {
        const decoded = await this.authService.verifyToken(token);
        console.log(`⛔ decoded: ${decoded}`);
        userId = decoded.userId;
      } catch (error) {
        console.error('⛔ JWT 검증 실패:', error.message);
      }
    }

    console.log(`⛔ userId: ${userId}`);

    if (!userId) {
      console.error(`⛔ userId가 없으므로 연결을 종료합니다: ${socket.id}`);
      socket.disconnect();
      return;
    }

    if (this.connectedClients.has(userId)) {
      console.log(`⛔ 이미 연결된 WebSocket (User ID): ${userId}`);
      return;
    }

    this.connectedClients.set(userId, { socket, userId });
    console.log(`✅ WebSocket 연결됨: ${socket.id}, User ID: ${userId}`);
  }

  async handleDisconnect(socket: Socket) {
    let userIdToDelete: string | undefined;

    // ✅ userId를 찾기 위해 Map을 검색
    for (const [userId, clientInfo] of this.connectedClients.entries()) {
      if (clientInfo.socket.id === socket.id) {
        userIdToDelete = userId;
        break;
      }
    }

    if (userIdToDelete) {
      this.connectedClients.delete(userIdToDelete);
      console.log(
        `⛔ WebSocket 연결 종료: ${socket.id}, User ID: ${userIdToDelete}`,
      );

      // ✅ 로그아웃 로그 기록
      await this.zLoginLogService.logoutLog(userIdToDelete);
    } else {
      console.warn(
        `⚠️ 연결 종료된 소켓에 대한 userId를 찾을 수 없음: ${socket.id}`,
      );
    }
  }

  // async handleDisconnect(socket: Socket) {
  //   if (this.connectedClients.has(socket.id)) {
  //     this.connectedClients.delete(socket.id);
  //     console.log(`⛔ WebSocket 연결 종료: ${socket.id}`);
  //   }

  //   await this.zLoginLogService.logoutLog('0000000012');
  // }

  // handleConnection(socket: Socket) {
  //   console.log(`✅ WebSocket 1`);
  //   console.log(
  //     'this.connectedClients.has(socket.id)',
  //     this.connectedClients.has(socket.id),
  //   );
  //   if (this.connectedClients.has(socket.id)) {
  //     console.log(`⛔ 이미 연결된 WebSocket: ${socket.id}`);
  //     return;
  //   }

  //   console.log(`✅ WebSocket 2`);

  //   this.connectedClients.set(socket.id, socket);

  //   console.log(`✅ WebSocket 연결됨: ${socket.id}`);
  //   // console.log(
  //   //   `✅ connectedClients :`,
  //   //   Array.from(this.connectedClients.entries()),
  //   // );

  //   // socket.emit('message', {
  //   //   message: 'Welcome to the WebSocket server!',
  //

  @SubscribeMessage('message')
  async sendMessage(
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
