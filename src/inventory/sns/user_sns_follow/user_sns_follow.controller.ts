import { UserSnsFollowService } from './user_sns_follow.service';
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('sns')
export class UserSnsFollowController {
  constructor(private readonly userSnsFollowService: UserSnsFollowService) {}

  @Post('follow')
  @UseInterceptors(TransactionInterceptor)
  async followAdd(
    @User() user: Users,
    @Body('follow_user_id') follow_user_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSnsFollowService.followAdd(
      user.id,
      follow_user_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('unfollow')
  @UseInterceptors(TransactionInterceptor)
  async unFollow(
    @User() user: Users,
    @Body('follow_user_id') follow_user_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSnsFollowService.unFollow(
      user.id,
      follow_user_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Get('follow')
  @UseInterceptors(TransactionInterceptor)
  async FollowList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userSnsFollowService.followList(user.id, qr);
    return JSON.stringify(result);
  }
}
