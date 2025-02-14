import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    NestRedisModule.forRoot({
      closeClient: true, // 앱이 종료될 때 Redis 연결도 닫음
      readyLog: true, // Redis가 준비되면 로그 출력
      config: {
        host: 'localhost', // Redis 호스트
        port: 6379, // Redis 포트
      },
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
