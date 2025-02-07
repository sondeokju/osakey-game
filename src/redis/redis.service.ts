// import { Inject, Injectable } from '@nestjs/common';
// import { Redis } from 'ioredis';

// @Injectable()
// export class RedisService {
//   constructor(@Inject('RedisClient') private readonly redis: Redis) {}

//   async setKey(key: string, value: string, ttl = 60): Promise<void> {
//     await this.redis.set(key, value, 'EX', ttl); // 60초 후 만료
//   }

//   async getKey(key: string): Promise<string | null> {
//     return await this.redis.get(key);
//   }

//   async deleteKey(key: string): Promise<void> {
//     await this.redis.del(key);
//   }
// }
