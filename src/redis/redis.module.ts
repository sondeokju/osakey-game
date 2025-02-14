import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Module({
  imports: [
    NestRedisModule.forRoot({
      closeClient: true,
      readyLog: true,
      config: {
        namespace: 'default', // 기본 네임스페이스
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [RedisService],
  controllers: [RedisController],
  exports: [RedisService],
})
export class RedisModule {}
