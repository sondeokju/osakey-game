import { Module } from '@nestjs/common';
import { UserEduStatsService } from './user_edu_stats.service';
import { UserEduStatsController } from './user_edu_stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEduStats } from './entities/user_edu_stats.entity';
import { EduListService } from 'src/static-table/edu/edu_list/edu_list.service';
import { EduCurriculumService } from 'src/static-table/edu/edu_curriculum/edu_curriculum.service';
import { EduList } from 'src/static-table/edu/edu_list/entities/edu_list.entity';
import { EduCurriculum } from 'src/static-table/edu/edu_curriculum/entities/edu_curriculum.entity';
import { EduReduceTimeService } from 'src/static-table/edu/edu_reduce_time/edu_reduce_time.service';
import { EduReduceTime } from 'src/static-table/edu/edu_reduce_time/entities/edu_reduce_time.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEduStats,
      EduList,
      EduCurriculum,
      EduReduceTime,
    ]),
  ],
  exports: [UserEduStatsService],
  controllers: [UserEduStatsController],
  providers: [
    UserEduStatsService,
    EduListService,
    EduCurriculumService,
    EduReduceTimeService,
  ],
})
export class UserEduStatsModule {}
