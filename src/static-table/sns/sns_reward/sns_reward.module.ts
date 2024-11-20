import { Module } from '@nestjs/common';
import { SnsRewardService } from './sns_reward.service';
import { SnsRewardController } from './sns_reward.controller';

@Module({
  controllers: [SnsRewardController],
  providers: [SnsRewardService],
})
export class SnsRewardModule {}
