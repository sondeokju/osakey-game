import { Module } from '@nestjs/common';
import { DispatchRewardService } from './dispatch_reward.service';
import { DispatchRewardController } from './dispatch_reward.controller';

@Module({
  controllers: [DispatchRewardController],
  providers: [DispatchRewardService],
})
export class DispatchRewardModule {}
