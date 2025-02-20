import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserShopLimitService } from './user_shop_limit.service';

@Controller('shop')
export class UserShopLimitController {
  constructor(private readonly userShopLimitService: UserShopLimitService) {}

  @Get('purchase/status')
  @UseInterceptors(TransactionInterceptor)
  async getUserShopLimitAll(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userShopLimitService.getUserShopLimitAll(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('purchase')
  @UseInterceptors(TransactionInterceptor)
  async npcSendMailToPlayer(
    @User() user: Users,
    @Body('shop_id') shop_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userShopLimitService.shopPurchase(
      user.user_id,
      shop_id,
      qr,
    );

    return result;
  }

  @Post('buy-limit-time/modify')
  @UseInterceptors(TransactionInterceptor)
  async buyLimitTimeUpdate(
    @User() user: Users,
    @Body('shop_id') shop_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userShopLimitService.buyLimitTimeUpdate(
      user.user_id,
      shop_id,
      qr,
    );

    return result;
  }
}
