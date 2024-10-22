import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { Hero } from '../hero/entities/hero.entity';
import { HeroService } from '../hero/hero.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, Hero])],
  exports: [RewardService],
  controllers: [RewardController],
  providers: [RewardService, HeroService],
})
export class RewardModule {}
