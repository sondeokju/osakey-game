import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserSecameMailService } from './user_secame_mail.service';

@Controller('secame')
export class UserSecameMailController {
  constructor(private readonly userSecameMailService: UserSecameMailService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async getUserSecameMail(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userSecameMailService.getUserSecameMail(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('mail/send')
  @UseInterceptors(TransactionInterceptor)
  async npcSendMailToPlayer(
    @User() user: Users,
    @Body('mail_id') mail_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSecameMailService.npcSendMailToPlayer(
      user.user_id,
      mail_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('mail/read')
  @UseInterceptors(TransactionInterceptor)
  async readSecameMail(
    @User() user: Users,
    @Body('user_secame_mail_id') user_secame_mail_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSecameMailService.readSecameMail(
      user.user_id,
      user_secame_mail_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
