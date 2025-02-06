import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('tuna-tv')
export class UserTunaTvOnlineController {
  constructor(
    private readonly userTunaTvOnlineService: UserTunaTvOnlineService,
  ) {}

  @Get('online')
  @UseInterceptors(TransactionInterceptor)
  async FollowList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userTunaTvOnlineService.tunaTvOnlineList(qr);
  
    return result;
  }
}
