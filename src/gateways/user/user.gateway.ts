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
import { SessionRedisService } from 'src/redis/services/session-redis.service';
import { GameLogsService } from 'src/game_log/game_logs/game_logs.service';
import { LogType } from 'src/common/const/log-type.enum';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedClients = new Map<
    string,
    { socket: Socket; userId: string }
  >();

  constructor(
    private readonly userService: UserService,
    private readonly zLoginLogService: ZLoginLogService,
    private readonly sessionRedisService: SessionRedisService, // ✅ WebSocket 전용 Redis 서비스 사용
    private readonly gameLogsService: GameLogsService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.headers['token'] as string;
      if (!token) {
        console.error(`⛔ [WebSocket] 토큰 없음 - 연결 종료: ${socket.id}`);
        return socket.disconnect();
      }

      const userId = await this.userService.verifyToken(token);
      if (!userId) {
        console.error(
          `⛔ [WebSocket] 유효하지 않은 토큰 - 연결 종료: ${socket.id}`,
        );
        return socket.disconnect();
      }

      await this.sessionRedisService.saveSession(userId, socket.id);
      console.log(
        `✅ [WebSocket] 연결 성공 - User ID: ${userId}, Socket ID: ${socket.id}`,
      );
    } catch (error) {
      console.error(
        `❌ [WebSocket] 연결 처리 중 오류 발생 - Socket ID: ${socket.id}`,
        error,
      );
      socket.disconnect(); // 에러 발생 시 연결 종료
    }
  }

  async handleDisconnect(socket: Socket) {
    if (socket.data.isDisconnecting) return;
    socket.data.isDisconnecting = true;

    try {
      const userId = await this.sessionRedisService.getSessionBySocketId(
        socket.id,
      );
      if (!userId) {
        console.warn(`⚠️ [WebSocket] 세션 정보 없음 - Socket ID: ${socket.id}`);
        return;
      }

      try {
        await this.sessionRedisService.deleteSession(userId, socket.id);
      } catch (redisError) {
        console.error(
          `❌ [Redis] 세션 삭제 실패 - User ID: ${userId}, Socket ID: ${socket.id}`,
          redisError,
        );
      }

      try {
        await this.zLoginLogService.logoutLog(userId);

        const logoutLog = {};

        await this.gameLogsService.insertLog(
          LogType.PLAYER_LOGOUT,
          userId,
          logoutLog,
        );
      } catch (dbError) {
        console.error(
          `❌ [DB] 로그아웃 로그 저장 실패 - User ID: ${userId}`,
          dbError,
        );
      }

      console.log(
        `⛔ [WebSocket] 연결 종료 - User ID: ${userId}, Socket ID: ${socket.id}`,
      );
    } catch (error) {
      console.error(
        `❌ [WebSocket] 연결 종료 처리 중 오류 발생 - Socket ID: ${socket.id}`,
        error,
      );
    }
  }

  // async handleConnection(socket: Socket) {
  //   console.log(`✅ WebSocket 1`);

  //   // 헤더에서 token 가져오기 (소문자로 접근)
  //   const token = socket.handshake.headers['token'] as string;
  //   console.log('token:', token);

  //   let userId = '';

  //   if (token) {
  //     userId = await this.userService.verifyToken(token);
  //   }

  //   console.log(`⛔ userId: ${userId}`);

  //   if (!userId) {
  //     console.error(`⛔ userId가 없으므로 연결을 종료합니다: ${socket.id}`);
  //     socket.disconnect();
  //     return;
  //   }
  //   const redisDB = 3;

  //   // ✅ 기존 연결 확인 후 중복 연결 방지
  //   const existingSocketId = await this.redisService.getWithDB(
  //     redisDB,
  //     `user:${userId}`,
  //   );
  //   console.log(`existingSocketId: ${existingSocketId}`);
  //   if (existingSocketId) {
  //     console.log(`⛔ 이미 연결된 WebSocket (User ID): ${userId}`);
  //     return;
  //   }

  //   // ✅ Redis에 유저 ID와 소켓 ID 저장
  //   // ✅ 특정 Redis DB (예: 3번 DB) 선택 후 저장

  //   await this.redisService.setWithDB(redisDB, `user:${userId}`, socket.id);
  //   await this.redisService.setWithDB(redisDB, `socket:${socket.id}`, userId);

  //   console.log(`✅ WebSocket 연결됨: ${socket.id}, User ID: ${userId}`);
  // }

  // async handleDisconnect(socket: Socket) {
  //   const redisDB = 3;
  //   const userId = await this.redisService.getWithDB(
  //     redisDB,
  //     `socket:${socket.id}`,
  //   );

  //   if (userId) {
  //     // ✅ Redis에서 삭제
  //     await this.redisService.delWithDB(redisDB, `user:${userId}`);
  //     await this.redisService.delWithDB(redisDB, `socket:${socket.id}`);

  //     console.log(`⛔ WebSocket 연결 종료: ${socket.id}, User ID: ${userId}`);

  //     // ✅ 로그아웃 로그 기록
  //     await this.zLoginLogService.logoutLog(userId);
  //   } else {
  //     console.warn(
  //       `⚠️ 연결 종료된 소켓에 대한 userId를 찾을 수 없음: ${socket.id}`,
  //     );
  //   }
  // }

  @SubscribeMessage('message')
  async sendMessage(
    @ConnectedSocket() client: Socket,
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
