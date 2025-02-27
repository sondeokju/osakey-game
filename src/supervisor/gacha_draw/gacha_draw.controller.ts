import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { GachaDrawService } from './gacha_draw.service';

@Controller('gacha')
export class GachaDrawController {
  constructor(private readonly gachaDrawService: GachaDrawService) {}

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

  // @Post('simul')
  // @UseInterceptors(TransactionInterceptor)
  // async simulateGachaDraws(
  //   @User() user: Users,
  //   @Body('gacha_id') gacha_id: number,
  //   @Body('count') count: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.gachaDrawService.simulateGachaDraws(
  //     gacha_id,
  //     count,
  //     qr,
  //   );

  //   return result;
  // }

  @Post('draw')
  @UseInterceptors(TransactionInterceptor)
  async equipGachaDrawRandom(
    @User() user: Users,
    @Body('gacha_id') gacha_id: number,
    @Body('gacha_count') gacha_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.gachaDrawService.gacha(
      user.user_id,
      gacha_id,
      1,
      qr,
    );

    return result;
  }

  // @Post('draw')
  // @UseInterceptors(TransactionInterceptor)
  // async equipGachaDrawRandom(
  //   @User() user: Users,
  //   @Body('gacha_id') gacha_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.gachaDrawService.equipGachaDrawRandom(
  //     user.user_id,
  //     gacha_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }
}
