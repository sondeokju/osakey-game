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

  @Post('reward/all')
  @UseInterceptors(TransactionInterceptor)
  async rewardAll_YN(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userMailService.rewardAll_YN(user.user_id, qr);

    return JSON.stringify(result);
  }

  @Post('remove')
  @UseInterceptors(TransactionInterceptor)
  async removeYN(
    @User() user: Users,
    @Body('user_mail_id') user_mail_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMailService.removeYN(
      user.user_id,
      user_mail_id,
      qr,
    );

    return JSON.stringify(result);
  }

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
    @Body('deadline_day') deadline_day: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMailService.saveMail(
      user_id,
      send_type,
      image_text,
      mail_title,
      mail_text,
      reward_id,
      deadline_day,
      qr,
    );

    return JSON.stringify(result);
  }

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async userMailList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userMailService.userMailItemList(user.user_id, qr);
    return result;
  }

  @Post('reward')
  @UseInterceptors(TransactionInterceptor)
  async mailReward(
    @User() user: Users,
    @Body('user_mail_id') user_mail_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMailService.mailReward(
      user.user_id,
      user_mail_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
