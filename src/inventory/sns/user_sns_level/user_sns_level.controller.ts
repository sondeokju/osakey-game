import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserSnsLevelService } from './user_sns_level.service';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('sns')
export class UserSnsLevelController {
  constructor(private readonly userSnsLevelService: UserSnsLevelService) {}

  @Post('like/reward')
  @UseInterceptors(TransactionInterceptor)
  async tunaTvSave(
    @User() user: Users,
    @Body('tuna_tv_id') tuna_tv_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSnsLevelService.snsReward(
      user.id,
      tuna_tv_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Get('me')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userSnsLevelService.getSnsLevel(user.id, qr);

    return JSON.stringify(result);
  }
}
