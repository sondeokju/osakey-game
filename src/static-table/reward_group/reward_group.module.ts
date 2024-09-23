import { Module } from '@nestjs/common';
import { RewardGroupService } from './reward_group.service';
import { RewardGroupController } from './reward_group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardGroup } from './entities/reward_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RewardGroup])],
  exports: [RewardGroupService],
  controllers: [RewardGroupController],
  providers: [RewardGroupService],
})
export class RewardGroupModule {}
