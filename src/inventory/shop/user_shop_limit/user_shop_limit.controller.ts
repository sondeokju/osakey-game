import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserShopLimitService } from './user_shop_limit.service';

@Controller('secame')
export class UserShopLimitController {
  constructor(private readonly userShopLimitService: UserShopLimitService) {}

  // @Get('mail')
  // @UseInterceptors(TransactionInterceptor)
  // async getUserSecameMail(@User() user: Users, @QueryRunner() qr: QR) {
  //   const result = this.userShopLimitService.getUserSecameMail(
  //     user.user_id,
  //     qr,
  //   );
  //   return result;
  // }

  // @Post('mail/send')
  // @UseInterceptors(TransactionInterceptor)
  // async npcSendMailToPlayer(
  //   @User() user: Users,
  //   @Body('mail_id') mail_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userSecameMailService.npcSendMailToPlayer(
  //     user.user_id,
  //     mail_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }
}
