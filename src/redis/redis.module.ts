import { Module, Global } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { RedisController } from './redis.controller';
import { CacheRedisService } from './services/cache-redis.service';
import { SessionRedisService } from './services/session-redis.service';
import { RedisService } from './services/redis.service';

@Global()
@Module({
  imports: [
    NestRedisModule.forRootAsync({
      useFactory: async () => ({
        closeClient: true,
        readyLog: true,
        config: {
          namespace: 'default', // 기본 네임스페이스
          host: 'localhost',
          port: 6379,
          returnBuffers: true,
        },
      }),
    }),
  ],
  providers: [RedisService, SessionRedisService, CacheRedisService],
  controllers: [RedisController],
  exports: [RedisService, SessionRedisService, CacheRedisService],
})
export class RedisModule {}
