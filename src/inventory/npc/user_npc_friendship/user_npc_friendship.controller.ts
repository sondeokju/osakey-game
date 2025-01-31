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
import { UserNpcFriendshipService } from './user_npc_friendship.service';

@Controller('npc-friendship')
export class UserNpcFriendshipController {
  constructor(
    private readonly userNpcFriendshipService: UserNpcFriendshipService,
  ) {}

  @Get('')
  @UseInterceptors(TransactionInterceptor)
  async getUserSuit(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userNpcFriendshipService.getUserNpcFriendship(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('likeability/add')
  @UseInterceptors(TransactionInterceptor)
  async suitLevelUp(
    @User() user: Users,
    @Body('user_suit_id') user_suit_id: number,
    @Body('npc_likeability') npc_likeability: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userNpcFriendshipService.addNpcLikeability(
      user.user_id,
      user_suit_id,
      npc_likeability,
      qr,
    );

    return JSON.stringify(result);
  }
}
