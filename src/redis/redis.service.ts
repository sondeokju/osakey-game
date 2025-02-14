import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {} // 'default' 네임스페이스 사용 가능

  async setKey(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async getKey(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteKey(key: string) {
    await this.redisClient.del(key);
  }
}
