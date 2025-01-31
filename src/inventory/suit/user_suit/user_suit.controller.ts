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
import { UserSuitService } from './user_suit.service';

@Controller('suit')
export class UserSuitController {
  constructor(private readonly userSuitService: UserSuitService) {}

  @Get('list')
  @UseInterceptors(TransactionInterceptor)
  async getUserSuit(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userSuitService.getUserSuit(user.user_id, qr);
    return JSON.stringify(result);
  }

  @Post('levelUp')
  @UseInterceptors(TransactionInterceptor)
  async suitLevelUp(
    @User() user: Users,
    @Body('user_suit_id') user_suit_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSuitService.suitLevelUp(
      user.user_id,
      user_suit_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('special/levelUp')
  @UseInterceptors(TransactionInterceptor)
  async suitSpecialLevelUp(
    @User() user: Users,
    @Body('user_suit_id') user_suit_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSuitService.suitSpecialLevelUp(
      user.user_id,
      user_suit_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
