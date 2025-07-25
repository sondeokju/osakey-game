import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { RewardOfferService } from './reward_offer.service';

@Controller('reward')
export class RewardInvenController {
  constructor(private readonly rewardOfferService: RewardOfferService) {}

  @Post('offer')
  @UseInterceptors(TransactionInterceptor)
  async missionReward(
    @User() user: Users,
    @Body('reward_id') reward_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.rewardOfferService.reward(
      user.user_id,
      reward_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
