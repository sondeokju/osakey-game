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

@Controller('npc')
export class UserNpcFriendshipController {
  constructor(
    private readonly userNpcFriendshipService: UserNpcFriendshipService,
  ) {}

  // @Post('learn')
  // @UseInterceptors(TransactionInterceptor)
  // async eduLearn(
  //   @User() user: Users,
  //   @Body('edu_list_id') edu_list_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userEduStatsService.eduLearn(
  //     user.user_id,
  //     edu_list_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }

  // @Post('learn/complete')
  // @UseInterceptors(TransactionInterceptor)
  // async learnComplete(
  //   @User() user: Users,
  //   @Body('edu_list_id') edu_list_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userEduStatsService.learnComplete(
  //     user.user_id,
  //     edu_list_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }

  // @Post('reduce/item')
  // @UseInterceptors(TransactionInterceptor)
  // async reduceLearnTimeItem(
  //   @User() user: Users,
  //   @Body('edu_list_id') edu_list_id: number,
  //   @Body('edu_reduce_time_id') edu_reduce_time_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userEduStatsService.reduceLearnTimeItem(
  //     user.user_id,
  //     edu_list_id,
  //     edu_reduce_time_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }

  // @Post('reduce/currency')
  // @UseInterceptors(TransactionInterceptor)
  // async reduceLearnTimeCurrency(
  //   @User() user: Users,
  //   @Body('edu_list_id') edu_list_id: number,
  //   @Body('edu_reduce_time_id') edu_reduce_time_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userEduStatsService.reduceLearnTimeCurrency(
  //     user.user_id,
  //     edu_list_id,
  //     edu_reduce_time_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }

  // @Get('list')
  // @UseInterceptors(TransactionInterceptor)
  // async userEduList(@User() user: Users, @QueryRunner() qr: QR) {
  //   const result = this.userEduStatsService.userEduList(user.user_id, qr);
  //   return result;
  // }
}
