import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserSecameDiaryService } from './user_secame_diary.service';

@Controller('secame')
export class UserSecameDiaryController {
  constructor(
    private readonly userSecameDiaryService: UserSecameDiaryService,
  ) {}

  @Get('diary')
  @UseInterceptors(TransactionInterceptor)
  async getUserSecameDiary(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userSecameDiaryService.getUserSecameDiary(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('diary/add')
  @UseInterceptors(TransactionInterceptor)
  async secameDiaryAdd(
    @User() user: Users,
    @Body('mission_id') mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSecameDiaryService.secameDiaryAdd(
      user.user_id,
      mission_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('diary/reward')
  @UseInterceptors(TransactionInterceptor)
  async secameDiaryReward(
    @User() user: Users,
    //@Body('user_secame_diary_id') user_secame_diary_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userSecameDiaryService.secameDiaryReward(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
