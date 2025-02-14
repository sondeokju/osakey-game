import { Controller, Get, Query, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('set')
  async set(@Query('key') key: string, @Query('value') value: string) {
    console.log('key:', key);
    console.log('value:', value);
    await this.redisService.setKey(key, value);
    return { message: `Key "${key}" set with value "${value}"` };
  }

  @Get('get/:key')
  async get(@Param('key') key: string) {
    const value = await this.redisService.getKey(key);
    return { key, value };
  }

  @Get('del/:key')
  async delete(@Param('key') key: string) {
    await this.redisService.deleteKey(key);
    return { message: `Key "${key}" deleted` };
  }
}
