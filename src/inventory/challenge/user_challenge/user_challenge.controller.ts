import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserChallengeService } from './user_challenge.service';

@Controller('quest')
export class UserChallengeController {
  constructor(private readonly userChallengeService: UserChallengeService) {}

  @Get('challenge')
  @UseInterceptors(TransactionInterceptor)
  async getUserShopLimitAll(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userChallengeService.getUserChallengeAll(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('try')
  @UseInterceptors(TransactionInterceptor)
  async challengeQuest(
    @User() user: Users,
    @Body('mission_routine_id') mission_routine_id: number,
    @Body('count') count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userChallengeService.challengeQuest(
      user.user_id,
      mission_routine_id,
      count,
      qr,
    );

    return result;
  }

  @Post('reward')
  @UseInterceptors(TransactionInterceptor)
  async challengeQuestReward(
    @User() user: Users,
    @Body('mission_routine_id') mission_routine_id: number,
    @Body('count') count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userChallengeService.challengeQuestReward(
      user.user_id,
      mission_routine_id,
      count,
      qr,
    );

    return result;
  }

  @Post('reward/extra')
  @UseInterceptors(TransactionInterceptor)
  async challengeQuestextraReward(
    @User() user: Users,
    @Body('mission_kind') mission_kind: string,
    @Body('complete_count') complete_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userChallengeService.challengeQuestextraReward(
      user.user_id,
      mission_kind,
      complete_count,
      qr,
    );

    return result;
  }
}
