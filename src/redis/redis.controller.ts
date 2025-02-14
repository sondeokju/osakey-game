import { Controller, Get, Query, Param, Body, Post } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  // @Get('')
  // @UseInterceptors(TransactionInterceptor)
  // async achieve(@User() user: Users, @QueryRunner() qr: QR) {
  //   //console.log('achievements get');
  //   const result = this.userAchievementsService.getUserAchieveAll(
  //     user.user_id,
  //     qr,
  //   );
  //   return result;
  // }

  @Post('set')
  async setAdd(@Body('key') key: string, @Body('value') value: string) {
    console.log('redis set');
    await this.redisService.setKey(key, value);
    return { message: `Key "${key}" set with value "${value}"` };
  }

  //   @Get('set')
  //   async set(@Query('key') key: string, @Query('value') value: string) {
  //     console.log('key:', key);
  //     console.log('value:', value);
  //     await this.redisService.setKey(key, value);
  //     return { message: `Key "${key}" set with value "${value}"` };
  //   }

  //   @Post('save')
  //   @UseInterceptors(TransactionInterceptor)
  //   async saveAchieve(
  //     @User() user: Users,
  //     @Body('achieve_id') achieve_id: number,
  //     @Body('achieve_count') achieve_count: number,
  //     @Body('process_status') process_status: string,
  //     @QueryRunner() qr: QR,
  //   ) {
  //     const result = await this.userAchievementsService.saveAchieve(
  //       user.user_id,
  //       achieve_id,
  //       achieve_count,
  //       process_status,
  //       qr,
  //     );

  //     return JSON.stringify(result);
  //   }

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
