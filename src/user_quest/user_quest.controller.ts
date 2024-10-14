import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { Users } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('quest')
export class UserQuestController {
  constructor(private readonly userQuestService: UserQuestService) {}

  @Get('mission/all')
  @UseInterceptors(TransactionInterceptor)
  async getMissionAll(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userQuestService.getMissionAll(qr);
    return JSON.stringify(result);
  }

  @Get('/user/all')
  @UseInterceptors(TransactionInterceptor)
  async getUserQuestAll(@User() user: Users, @QueryRunner() qr: QR) {
    console.log(user.id);
    const result = await this.userQuestService.getUserQuestAll(user.id, qr);
    return JSON.stringify(result);
  }

  // @Get('mission_type')
  // @UseInterceptors(TransactionInterceptor)
  // async getUserQuestTypeList(
  //   @User() user: Users,
  //   @Body('mission_type', ParseIntPipe) mission_type: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userQuestService.getUserQuestTypeList(
  //     user.id,
  //     mission_type,
  //     qr,
  //   );
  //   return JSON.stringify(result);
  // }

  // @Post('reward')
  // @UseInterceptors(TransactionInterceptor)
  // async patchPayGordExpBattery(
  //   @User() user: Users,
  //   @Body('user_quest_id', ParseIntPipe) user_quest_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userQuestService.questDayWeekReward(
  //     user.id,
  //     user_quest_id,
  //     qr,
  //   );

  //   return result;
  // }
}
