import { Controller, Get, Query, Param, Body, Post } from '@nestjs/common';
import { RedisService } from './services/redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  /** 🔹 특정 길드의 점수 조회 (Body 사용) */
  @Post('guild-score')
  async getGuildScore(@Body('guildId') guildId: number) {
    if (!guildId) {
      return { message: 'Guild ID is required in the request body.' };
    }

    const score = await this.redisService.getGuildScore(guildId);
    if (score === null) {
      return { message: `Guild ID ${guildId} not found in ranking.` };
    }
    return { guildId, score };
  }

  /** 🔹 상위 N개 길드 랭킹 조회 (Body 사용) */
  @Post('top')
  async getTopGuilds(@Body('limit') limit: number) {
    if (!limit || limit <= 0) {
      return { message: 'Limit must be a positive number.' };
    }

    const rankings = await this.redisService.getTopGuilds(limit);
    return { topGuilds: rankings };
  }

  /** 🔹 특정 길드의 랭킹 조회 (내림차순 기준, Body 사용) */
  @Post('guild-rank')
  async getGuildRank(@Body('guildId') guildId: number) {
    if (!guildId) {
      return { message: 'Guild ID is required in the request body.' };
    }

    const rank = await this.redisService.getGuildRank(guildId);
    if (rank === null) {
      return { message: `Guild ID ${guildId} not found in ranking.` };
    }
    return { guildId, rank };
  }

  @Post('testRanking')
  async resetAndTestRanking() {
    console.log('🔹 Redis 랭킹 데이터 초기화 및 테스트 실행...');
    await this.redisService.testGuildNameRedisRanking();
    return { message: 'Redis 랭킹 데이터 초기화 후 테스트 완료' };
  }

  // @Post('set')
  // async setAdd(@Body('key') key: string, @Body('value') value: string) {
  //   console.log('redis set');
  //   await this.redisService.setKey(key, value);
  //   return { message: `Key "${key}" set with value "${value}"` };
  // }

  // @Get('get')
  // async set(@Body('key') key: string) {
  //   const value = await this.redisService.getKey(key);
  //   return { key, value };
  // }

  // @Post('del')
  // async delete(@Body('key') key: string) {
  //   await this.redisService.deleteKey(key);
  //   return { message: `Key "${key}" deleted` };
  // }
}
