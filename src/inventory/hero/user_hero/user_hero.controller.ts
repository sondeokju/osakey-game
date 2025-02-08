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
import { UserHeroService } from './user_hero.service';

@Controller('hero')
export class UserHeroController {
  constructor(private readonly userHeroService: UserHeroService) {}

  // @Get('')
  // @UseInterceptors(TransactionInterceptor)
  // async getUserSuit(@User() user: Users, @QueryRunner() qr: QR) {
  //   const result = this.userNpcFriendshipService.getUserNpcFriendship(
  //     user.user_id,
  //     qr,
  //   );
  //   return result;
  // }

  @Post('levelup')
  @UseInterceptors(TransactionInterceptor)
  async heroLevelUp(
    @User() user: Users,
    //@Body('npc_id') npc_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userHeroService.heroLevelUp(user.user_id, qr);

    return result;
  }
}
