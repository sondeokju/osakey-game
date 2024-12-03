import { UserMemoryService } from './user_memory.service';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('memory')
export class UserMemoryController {
  constructor(private readonly userMemoryService: UserMemoryService) {}

  @Post('add')
  @UseInterceptors(TransactionInterceptor)
  async followAdd(
    @User() user: Users,
    @Body('boss_id') boss_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMemoryService.memoryAdd(user.id, boss_id, qr);

    return JSON.stringify(result);
  }
}
