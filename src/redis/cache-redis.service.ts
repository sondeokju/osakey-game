import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class CacheRedisService {
  private readonly dbNumber = 5; // 캐시용 Redis DB 지정

  constructor(private readonly redisService: RedisService) {}

  async setCache(key: string, value: string, ttl: number) {
    const client = this.redisService['getClient'](this.dbNumber);
    await client.set(key, value, 'EX', ttl); // TTL 설정
  }

  async getCache(key: string): Promise<string | null> {
    return await this.redisService.getWithDB(this.dbNumber, key);
  }

  async deleteCache(key: string) {
    await this.redisService.delWithDB(this.dbNumber, key);
  }
}
