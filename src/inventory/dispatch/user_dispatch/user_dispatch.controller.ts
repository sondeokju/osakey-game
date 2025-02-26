import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserDispatchService } from './user_dispatch.service';

@Controller('dispatch')
export class UserDispatchController {
  constructor(private readonly userDispatchService: UserDispatchService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async getUserDispatch(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userDispatchService.getUserDispatch(user.user_id, qr);
    return result;
  }

  @Post('start')
  @UseInterceptors(TransactionInterceptor)
  async dispatchStart(
    @User() user: Users,
    @Body('mission_id') mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userDispatchService.dispatchStart(
      user.user_id,
      mission_id,
      qr,
    );

    return result;
  }

  @Post('outcome')
  @UseInterceptors(TransactionInterceptor)
  async dispatchOutcome(
    @User() user: Users,
    @Body('mission_id') mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userDispatchService.dispatchOutcome(
      user.user_id,
      mission_id,
      qr,
    );

    return result;
  }
}
