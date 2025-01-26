import { Module } from '@nestjs/common';
import { UserIngameRewardService } from './user_ingame_reward.service';
import { UserIngameRewardController } from './user_ingame_reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIngameReward } from 'src/inventory/reward/user_ingame_reward/entities/user_ingame_reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserIngameReward])],
  exports: [UserIngameRewardService],
  controllers: [UserIngameRewardController],
  providers: [UserIngameRewardService],
})
export class UserIngameRewardModule {}
