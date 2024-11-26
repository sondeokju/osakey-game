import { Module } from '@nestjs/common';
import { UserAbilityStatsService } from './user_ability_stats.service';
import { UserAbilityStatsController } from './user_ability_stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAbilityStats } from './entities/user_ability_stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAbilityStats])],
  exports: [UserAbilityStatsService],
  controllers: [UserAbilityStatsController],
  providers: [UserAbilityStatsService],
})
export class UserAbilityStatsModule {}
