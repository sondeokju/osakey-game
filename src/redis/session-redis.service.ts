import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class SessionRedisService {
  private readonly dbNumber = 3; // 세션용 Redis DB 지정

  constructor(private readonly redisService: RedisService) {}

  async saveSession(userId: string, socketId: string) {
    await this.redisService.setWithDB(
      this.dbNumber,
      `user:${userId}`,
      socketId,
    );
    await this.redisService.setWithDB(
      this.dbNumber,
      `socket:${socketId}`,
      userId,
    );
  }

  async getSessionByUserId(userId: string): Promise<string | null> {
    return await this.redisService.getWithDB(this.dbNumber, `user:${userId}`);
  }

  async getSessionBySocketId(socketId: string): Promise<string | null> {
    return await this.redisService.getWithDB(
      this.dbNumber,
      `socket:${socketId}`,
    );
  }

  async deleteSession(userId: string, socketId: string) {
    await this.redisService.delWithDB(this.dbNumber, `user:${userId}`);
    await this.redisService.delWithDB(this.dbNumber, `socket:${socketId}`);
  }
}
