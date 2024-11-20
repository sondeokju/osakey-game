import { Module } from '@nestjs/common';
import { SnsRewardService } from './sns_reward.service';
import { SnsRewardController } from './sns_reward.controller';
import { SnsReward } from './entities/sns_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SnsReward])],
  exports: [SnsRewardService],
  controllers: [SnsRewardController],
  providers: [SnsRewardService],
})
export class SnsRewardModule {}
