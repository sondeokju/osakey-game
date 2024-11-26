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
import { UserEduStatsService } from './user_edu_stats.service';

@Controller('edu')
export class UserEduStatsController {
  constructor(private readonly userEduStatsService: UserEduStatsService) {}

  @Post('learn')
  @UseInterceptors(TransactionInterceptor)
  async eduLearn(
    @User() user: Users,
    @Body('edu_list_id') edu_list_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEduStatsService.eduLearn(
      user.id,
      edu_list_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('learn/complete')
  @UseInterceptors(TransactionInterceptor)
  async learnComplete(
    @User() user: Users,
    @Body('edu_list_id') edu_list_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEduStatsService.learnComplete(
      user.id,
      edu_list_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
