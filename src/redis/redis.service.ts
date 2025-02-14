import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis('default') private readonly redisClient: Redis) {}

  async setKey(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async getKey(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteKey(key: string) {
    await this.redisClient.srem(key);
  }
}
