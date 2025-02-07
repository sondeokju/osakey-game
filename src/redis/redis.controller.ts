import { Controller, Get, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  // @Get('set/:key/:value')
  // async set(@Param('key') key: string, @Param('value') value: string) {
  //   await this.redisService.setKey(key, value);
  //   return { message: `Key "${key}" set with value "${value}"` };
  // }

  // @Get('get/:key')
  // async get(@Param('key') key: string) {
  //   const value = await this.redisService.getKey(key);
  //   return { key, value };
  // }

  // @Get('del/:key')
  // async delete(@Param('key') key: string) {
  //   await this.redisService.deleteKey(key);
  //   return { message: `Key "${key}" deleted` };
  // }
}
