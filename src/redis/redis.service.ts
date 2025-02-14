import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly RANKING_KEY = 'guild_ranking'; // Redis Sorted Set 키

  constructor(@InjectRedis('default') private readonly redisClient: Redis) {}

  /** 🔹 1. 길드 점수를 Redis에 저장 */
  async addGuildScore(guildId: number, score: number) {
    await this.redisClient.zadd(this.RANKING_KEY, score, guildId.toString());
  }

  /** 🔹 2. 특정 길드의 랭킹 조회 (내림차순 기준) */
  async getGuildRank(guildId: number): Promise<number | null> {
    const rank = await this.redisClient.zrevrank(
      this.RANKING_KEY,
      guildId.toString(),
    );
    return rank !== null ? rank + 1 : null; // Redis는 0부터 시작하므로 +1
  }

  /** 🔹 3. 상위 N개 길드 랭킹 조회 (순위 포함) */
  async getTopGuilds(
    limit: number,
  ): Promise<{ rank: number; guildId: number; score: number }[]> {
    const results = await this.redisClient.zrevrange(
      this.RANKING_KEY,
      0,
      limit - 1,
      'WITHSCORES',
    );
    const rankings = [];
    for (let i = 0, rank = 1; i < results.length; i += 2, rank++) {
      rankings.push({
        rank, // 순위 추가 (1부터 시작)
        guildId: Number(results[i]),
        score: Number(results[i + 1]),
      });
    }
    return rankings;
  }

  /** 🔹 4. 특정 길드의 점수 조회 */
  async getGuildScore(guildId: number): Promise<number | null> {
    const score = await this.redisClient.zscore(
      this.RANKING_KEY,
      guildId.toString(),
    );
    return score !== null ? Number(score) : null;
  }

  /** 🔹 5. 랭킹 데이터 초기화 */
  async resetRanking() {
    await this.redisClient.del(this.RANKING_KEY);
  }

  /** 🔹 6. 대량 테스트 함수: 10,000개 길드 데이터 추가 및 조회 실행 */
  async testRedisRanking() {
    console.log('🔹 랭킹 데이터 초기화');
    await this.resetRanking();

    console.log('✅ 10,000개 길드 점수 추가 시작...');

    // 1만 개 길드 생성 (랜덤 점수 0~10,000)
    const testGuilds = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1, // 길드 ID (1부터 10,000까지)
      score: Math.floor(Math.random() * 10001), // 0~10000 랜덤 점수
    }));

    // 🚀 병렬 처리로 Redis에 빠르게 데이터 추가
    await Promise.all(
      testGuilds.map((guild) => this.addGuildScore(guild.id, guild.score)),
    );

    console.log('✅ 10,000개 길드 점수 추가 완료!');

    // 🔹 랜덤한 5개 길드의 순위 조회 (테스트용)
    const randomGuilds = [1, 500, 2500, 7500, 9999]; // 샘플 길드 ID
    console.log('✅ 개별 길드 순위 조회');
    for (const guildId of randomGuilds) {
      const rank = await this.getGuildRank(guildId);
      console.log(`🔹 길드 ${guildId} 순위: ${rank}`);
    }

    console.log('✅ 길드 3의 점수:', await this.getGuildScore(3)); // 샘플 길드 점수 확인
    console.log('✅ 상위 10개 길드 랭킹:', await this.getTopGuilds(10)); // 상위 10개 랭킹 조회
  }

  /** 🔹 6. 대량 테스트 함수: 10,000개 길드 데이터 추가 및 조회 실행 */
  async testGuildNameRedisRanking() {
    console.log('🔹 랭킹 데이터 초기화');
    await this.resetRanking();

    console.log('✅ 10,000개 길드 점수 추가 시작...');

    // 길드명 생성 함수
    const generateGuildName = (guildId: number) => {
      const adjectives = [
        'Mighty',
        'Brave',
        'Shadow',
        'Iron',
        'Golden',
        'Storm',
        'Silent',
        'Furious',
        'Ancient',
        'Eternal',
      ];
      const nouns = [
        'Warriors',
        'Knights',
        'Hunters',
        'Guardians',
        'Rangers',
        'Lords',
        'Champions',
        'Slayers',
        'Defenders',
        'Raiders',
      ];
      return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
        nouns[Math.floor(Math.random() * nouns.length)]
      } ${guildId}`;
    };

    // 1만 개 길드 생성 (랜덤 점수 0~10,000 + 랜덤 길드명)
    const testGuilds = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1, // 길드 ID (1부터 10,000까지)
      name: generateGuildName(i + 1), // 랜덤 길드명
      score: Math.floor(Math.random() * 10001), // 0~10000 랜덤 점수
    }));

    // 🚀 병렬 처리로 Redis에 빠르게 데이터 추가
    await Promise.all(
      testGuilds.map((guild) => this.addGuildScore(guild.id, guild.score)),
    );

    console.log('✅ 10,000개 길드 점수 추가 완료!');

    // 🔹 랜덤한 5개 길드의 순위 및 이름 조회 (테스트용)
    const randomGuilds = [1, 500, 2500, 7500, 9999]; // 샘플 길드 ID
    console.log('✅ 개별 길드 순위 조회');
    for (const guildId of randomGuilds) {
      const rank = await this.getGuildRank(guildId);
      const guild = testGuilds.find((g) => g.id === guildId);
      console.log(`🔹 길드 ${guild?.name} (ID: ${guildId}) 순위: ${rank}`);
    }

    console.log('✅ 길드 3의 점수:', await this.getGuildScore(3)); // 샘플 길드 점수 확인

    // 🔹 상위 10개 길드 랭킹 조회 및 이름 출력
    console.log('✅ 상위 10개 길드 랭킹:');
    const topGuilds = await this.getTopGuilds(10);
    topGuilds.forEach((guild, index) => {
      const guildInfo = testGuilds.find((g) => g.id === guild.guildId);
      console.log(
        `#${index + 1} - ${guildInfo?.name} (ID: ${guild.guildId}, 점수: ${
          guild.score
        })`,
      );
    });
  }

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
