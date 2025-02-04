import { Module } from '@nestjs/common';
import { TutorialRewardService } from './tutorial_reward.service';
import { TutorialRewardController } from './tutorial_reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorialReward } from './entities/tutorial_reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TutorialReward])],
  exports: [TutorialRewardService],
  controllers: [TutorialRewardController],
  providers: [TutorialRewardService],
})
export class TutorialRewardModule {}
