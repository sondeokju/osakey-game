import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserTutorialService } from './user_tutorial.service';

@Controller('tutorial')
export class UserTutorialController {
  constructor(private readonly userTutorialService: UserTutorialService) {}

  @Get('')
  @UseInterceptors(TransactionInterceptor)
  async achieve(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userTutorialService.getUserTutorialAll(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async saveTutorial(
    @User() user: Users,
    @Body('tutorial_id') tutorial_id: number,
    @Body('tutorial_sub_id') tutorial_sub_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userTutorialService.saveTutorial(
      user.user_id,
      tutorial_id,
      tutorial_sub_id,
      qr,
    );

    return result;
  }
}
