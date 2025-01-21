import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserItemExchangeService } from './user_item_exchange.service';

@Controller('exchange')
export class UserItemExchangeController {
  constructor(
    private readonly userItemExchangeService: UserItemExchangeService,
  ) {}

  @Get('item')
  @UseInterceptors(TransactionInterceptor)
  async getItemExchange(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userItemExchangeService.getItemExchange(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('item')
  @UseInterceptors(TransactionInterceptor)
  async missionReward(
    @User() user: Users,
    @Body('exchange_item_id') exchange_item_id: number,
    @Body('exchange_item_count') exchange_item_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userItemExchangeService.saveItemExchange(
      user.user_id,
      exchange_item_id,
      exchange_item_count,
      qr,
    );

    return result;
  }
}
