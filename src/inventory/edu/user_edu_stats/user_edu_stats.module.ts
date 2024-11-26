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
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEduStats,
      EduList,
      EduCurriculum,
      EduReduceTime,
      Item,
    ]),
  ],
  exports: [UserEduStatsService],
  controllers: [UserEduStatsController],
  providers: [
    UserEduStatsService,
    EduListService,
    EduCurriculumService,
    EduReduceTimeService,
    ItemService,
    RewardOfferService,
  ],
})
export class UserEduStatsModule {}
