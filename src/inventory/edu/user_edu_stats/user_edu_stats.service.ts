import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserEduStats } from './entities/user_edu_stats.entity';
import { EduListService } from 'src/static-table/edu/edu_list/edu_list.service';
import { EduCurriculumService } from 'src/static-table/edu/edu_curriculum/edu_curriculum.service';
import { EduReduceTimeService } from 'src/static-table/edu/edu_reduce_time/edu_reduce_time.service';

@Injectable()
export class UserEduStatsService {
  constructor(
    @InjectRepository(UserEduStats)
    private readonly userEduStatsRepository: Repository<UserEduStats>,
    private readonly eduListService: EduListService,
    private readonly eduCurriculumService: EduCurriculumService,
    private readonly eduReduceTimeService: EduReduceTimeService,
  ) {}

  getUserEduStatsRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEduStats>(UserEduStats)
      : this.userEduStatsRepository;
  }

  async eduLearn(user_id: number, edu_list_id: number, qr?: QueryRunner) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const userEduStats = await userEduStatsRepository.findOne({
      where: {
        user_id,
        edu_list_id,
      },
    });

    const eduList = await this.eduListService.getEduList(edu_list_id, qr);

    if (!eduList) {
      throw new NotFoundException('edu_list not found');
    }

    if (!userEduStats) {
      const eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
        edu_list_id,
        1,
        qr,
      );

      const updatedDate = new Date();
      updatedDate.setMilliseconds(0);

      const userEduStatsInsert = {
        user_id,
        edu_list_id,
        edu_type: eduList.edu_type,
        edu_curriculum_cnt: 1,
        edu_buff_type: eduList.edu_buff_type,
        edu_buff_value: eduList.edu_buff_value,
        edu_time: eduCurriculum.edu_time,
        edu_start_date: updatedDate,
        edu_end_date: new Date(
          updatedDate.getTime() + eduCurriculum.edu_time * 60000,
        ),
      };

      await userEduStatsRepository.insert(userEduStatsInsert);
    } else {
      if (userEduStats.edu_curriculum_cnt >= eduList.edu_curriculum_max) {
        throw new NotFoundException('edu_curriculum_max over');
      }

      await userEduStatsRepository.save({
        ...userEduStats,
        edu_curriculum_cnt: userEduStats.edu_curriculum_cnt + 1,
        edu_buff_value: userEduStats.edu_buff_value + eduList.edu_buff_value,
      });
    }

    const result = await userEduStatsRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }

  async reduceLearnTime(
    user_id: number,
    edu_list_id: number,
    edu_reduce_time_id: number,
    qr?: QueryRunner,
  ) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const userEduStats = await userEduStatsRepository.findOne({
      where: {
        user_id,
        edu_list_id,
      },
    });

    if (!userEduStats) {
      throw new NotFoundException('user_edu_stats not found');
    }

    const eduReduceTime = await this.eduReduceTimeService.getEduReduceTime(
      edu_reduce_time_id,
      qr,
    );

    if (!eduReduceTime) {
      throw new NotFoundException('edu_reduce_time not found');
    }

    await userEduStatsRepository.save({
      ...userEduStats,
      //edu_learn_yn: 'Y',
    });

    const result = await userEduStatsRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }

  async learnComplete(user_id: number, edu_list_id: number, qr?: QueryRunner) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const userEduStats = await userEduStatsRepository.findOne({
      where: {
        user_id,
        edu_list_id,
      },
    });

    if (!userEduStats) {
      throw new NotFoundException('user_edu_stats not found');
    }

    await userEduStatsRepository.save({
      ...userEduStats,
      edu_learn_yn: 'Y',
    });

    const result = await userEduStatsRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
