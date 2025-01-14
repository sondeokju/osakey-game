import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserMailService } from './user_mail.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('mail')
export class UserMailController {
  constructor(private readonly userMailService: UserMailService) {}

  @IsPublic()
  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async achieveReward(
    //@User() user: Users,
    @Body('user_id') user_id: string,
    @Body('send_type') send_type: string,
    @Body('image_text') image_text: string,
    @Body('mail_title') mail_title: string,
    @Body('mail_text') mail_text: string,
    @Body('reward_id') reward_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMailService.saveMail(
      user_id,
      send_type,
      image_text,
      mail_title,
      mail_text,
      reward_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
