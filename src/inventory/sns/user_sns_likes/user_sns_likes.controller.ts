import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserSnsLikesService } from './user_sns_likes.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('tuna-tv')
export class UserSnsLikesController {
  constructor(private readonly userSnsLikesService: UserSnsLikesService) {}

  @Get('like/check')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvList(
    @User() user: Users,
    @Body('tuna_tv_id') tuna_tv_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSnsLikesService.isLiked(
      user.id,
      tuna_tv_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
