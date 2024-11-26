import { Module } from '@nestjs/common';
import { UserEduStatsService } from './user_edu_stats.service';
import { UserEduStatsController } from './user_edu_stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEduStats } from './entities/user_edu_stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEduStats])],
  exports: [UserEduStatsService],
  controllers: [UserEduStatsController],
  providers: [UserEduStatsService],
})
export class UserEduStatsModule {}
