import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { UsersModel } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('quest')
export class UserQuestController {
  constructor(private readonly userQuestService: UserQuestService) {}

  @Get('list')
  @UseInterceptors(TransactionInterceptor)
  async getUserQuestAll(@User() user: UsersModel, @QueryRunner() qr: QR) {
    const result = await this.userQuestService.getUserQuestAll(user.id, qr);
    return JSON.stringify(result);
  }
}
