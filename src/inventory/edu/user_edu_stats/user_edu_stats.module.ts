import { Module } from '@nestjs/common';
import { UserEduStatsService } from './user_edu_stats.service';
import { UserEduStatsController } from './user_edu_stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEduStats } from './entities/user_edu_stats.entity';
import { EduListService } from 'src/static-table/edu/edu_list/edu_list.service';
import { EduCurriculumService } from 'src/static-table/edu/edu_curriculum/edu_curriculum.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEduStats])],
  exports: [UserEduStatsService],
  controllers: [UserEduStatsController],
  providers: [UserEduStatsService, EduListService, EduCurriculumService],
})
export class UserEduStatsModule {}
