import { Module } from '@nestjs/common';
import { DispatchRewardService } from './dispatch_reward.service';
import { DispatchRewardController } from './dispatch_reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchReward } from './entities/dispatch_reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchReward])],
  exports: [DispatchRewardService],
  controllers: [DispatchRewardController],
  providers: [DispatchRewardService],
})
export class DispatchRewardModule {}
