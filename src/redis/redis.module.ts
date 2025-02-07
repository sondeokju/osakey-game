import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
//import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    NestRedisModule.forRoot({
      readyLog: true, // Redis가 준비되면 로그 출력
      config: {
        host: 'localhost', // Redis 호스트
        port: 6379, // Redis 포트
        // password: 'bitnami', // 비밀번호 설정 (필요한 경우)
      },
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
