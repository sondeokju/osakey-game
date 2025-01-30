import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserIngameRewardService } from './user_ingame_reward.service';

@Controller('stage')
export class UserIngameRewardController {
  constructor(
    private readonly userIngameRewardService: UserIngameRewardService,
  ) {}

  // @Get()
  // @UseInterceptors(TransactionInterceptor)
  // async getUserIngameReward(@User() user: Users, @QueryRunner() qr: QR) {
  //   const result = this.userIngameRewardService.getUserIngameReward(
  //     user.user_id,
  //     qr,
  //   );
  //   return result;
  // }

  @Post('reward')
  @UseInterceptors(TransactionInterceptor)
  async saveAchieve(
    @User() user: Users,
    @Body('game_mode') game_mode: string,
    @Body('stage_id') stage_id: number,
    @Body('stage_clear_yn') stage_clear_yn: string,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userIngameRewardService.stageReward(
      user.user_id,
      game_mode,
      stage_id,
      stage_clear_yn,
      qr,
    );

    return JSON.stringify(result);
  }

  // @Post('reward')
  // @UseInterceptors(TransactionInterceptor)
  // async achieveReward(
  //   @User() user: Users,
  //   @Body('user_achievements_id') user_achievements_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userAchievementsService.achieveReward(
  //     user.user_id,
  //     user_achievements_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }
}
