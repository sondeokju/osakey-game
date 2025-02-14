import { Controller, Get, Query, Param, Body, Post } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async setAdd(@Body('key') key: string, @Body('value') value: string) {
    console.log('redis set');
    await this.redisService.setKey(key, value);
    return { message: `Key "${key}" set with value "${value}"` };
  }

  @Get('get')
  async set(@Body('key') key: string) {
    const value = await this.redisService.getKey(key);
    return { key, value };
  }

  @Post('del')
  async delete(@Body('key') key: string) {
    await this.redisService.deleteKey(key);
    return { message: `Key "${key}" deleted` };
  }
}
