import { Module } from '@nestjs/common';
import { RewardGroupService } from './reward_group.service';
import { RewardGroupController } from './reward_group.controller';

@Module({
  controllers: [RewardGroupController],
  providers: [RewardGroupService],
})
export class RewardGroupModule {}
