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

  @Post('mission/all')
  @UseInterceptors(TransactionInterceptor)
  async getMissionAll(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userQuestService.getMissionAll(qr);
    return JSON.stringify(result);
  }

  @Post('/user/all')
  @UseInterceptors(TransactionInterceptor)
  async getUserQuestAll(@User() user: Users, @QueryRunner() qr: QR) {
    console.log(user.id);
    const result = await this.userQuestService.getUserQuestAll(
      user.user_id,
      qr,
    );
    return JSON.stringify(result);
  }

  // @Get('mission_type')
  // @UseInerceptors(TransactionInterceptor)
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

  @Post('dayweek/reward')
  @UseInterceptors(TransactionInterceptor)
  async questDayWeekReward(
    @User() user: Users,
    @Body('user_quest_id', ParseIntPipe) user_quest_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.questDayWeekReward(
      user.user_id,
      user_quest_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('main/reward')
  @UseInterceptors(TransactionInterceptor)
  async questMainReward(
    @User() user: Users,
    @Body('user_quest_id', ParseIntPipe) user_quest_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.questMainReward(
      user.user_id,
      user_quest_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('sub/reward')
  @UseInterceptors(TransactionInterceptor)
  async questSubReward(
    @User() user: Users,
    @Body('user_quest_id', ParseIntPipe) user_quest_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.questSubReward(
      user.user_id,
      user_quest_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('accept')
  @UseInterceptors(TransactionInterceptor)
  async questAccept(
    @User() user: Users,
    @Body('user_quest_id', ParseIntPipe) user_quest_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.questAccept(
      user.user_id,
      user_quest_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('complete')
  @UseInterceptors(TransactionInterceptor)
  async questComplete(
    @User() user: Users,
    @Body('user_quest_id', ParseIntPipe) user_quest_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.questComplete(
      user.user_id,
      user_quest_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('reset')
  @UseInterceptors(TransactionInterceptor)
  async questReset(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userQuestService.questReset(user.user_id, qr);

    return JSON.stringify(result);
  }

  @Post('sub/select')
  @UseInterceptors(TransactionInterceptor)
  async questSubMissionSelect(
    @User() user: Users,
    //@Body('user_quest_id', ParseIntPipe) user_quest_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.questSubMissionSelect(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
