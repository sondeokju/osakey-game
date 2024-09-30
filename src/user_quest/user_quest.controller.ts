import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { UsersModel } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('quest')
export class UserQuestController {
  constructor(private readonly userQuestService: UserQuestService) {}

  @Get('/all')
  @UseInterceptors(TransactionInterceptor)
  async getUserQuestAll(@User() user: UsersModel, @QueryRunner() qr: QR) {
    const result = await this.userQuestService.getUserQuestAll(user.id, qr);
    return JSON.stringify(result);
  }

  @Get('/type/:mission_type')
  @UseInterceptors(TransactionInterceptor)
  async getUserQuestTypeList(
    @User() user: UsersModel,
    @Param('mission_type') mission_type: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userQuestService.getUserQuestTypeList(
      user.id,
      mission_type,
      qr,
    );
    return JSON.stringify(result);
  }
}
