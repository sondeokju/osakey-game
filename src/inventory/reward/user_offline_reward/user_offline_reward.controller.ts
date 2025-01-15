import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserOfflineRewardService } from './user_offline_reward.service';

@Controller('offline-reward')
export class UserOfflineRewardController {
  constructor(
    private readonly userOfflineRewardService: UserOfflineRewardService,
  ) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async offlineRewardList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userOfflineRewardService.offlineRewardList(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async saveAchieve(
    @User() user: Users,
    @Body('last_reward_date') last_reward_date?: Date,
    @Body('last_ad_date') last_ad_date?: Date,
    @Body('ad_reward_count') ad_reward_count?: number,
    @QueryRunner() qr?: QR,
  ) {
    const result = await this.userOfflineRewardService.saveOfflineReward(
      user.user_id,
      last_reward_date,
      last_ad_date,
      ad_reward_count,
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
