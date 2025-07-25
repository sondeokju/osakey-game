import { UserMemoryRentService } from './user_memory_rent.service';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('memory-rent')
export class UserMemoryRentController {
  constructor(private readonly userMemoryRentService: UserMemoryRentService) {}

  @Post('add')
  @UseInterceptors(TransactionInterceptor)
  async followAdd(
    @User() user: Users,
    @Body('rent_memory_user_id') rent_memory_user_id: string,
    @Body('boss_id') boss_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMemoryRentService.memoryRent(
      user.user_id,
      rent_memory_user_id,
      boss_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('clear')
  @UseInterceptors(TransactionInterceptor)
  async rentMemoryClear(
    @User() user: Users,
    @Body('slot') slot: number,

    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMemoryRentService.rentMemoryClear(
      user.user_id,
      slot,
      qr,
    );

    return JSON.stringify(result);
  }

  @Get('list')
  @UseInterceptors(TransactionInterceptor)
  async getUserMemoryRent(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userMemoryRentService.getUserMemoryRent(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
