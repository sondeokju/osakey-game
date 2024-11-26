import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserEduStats } from './entities/user_edu_stats.entity';


@Injectable()
export class UserEduStatsService {
  constructor(
    @InjectRepository(UserEduStats)
    private readonly userEduStatsRepository: Repository<UserEduStats>,
  ) {}

  getUserEduStatsRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEduStats>(UserEduStats)
      : this.userEduStatsRepository;
  }

  async tunaTvSave(
    user_id: number,
    tuna_tile: string,
    ingame_kind: string,
    select_1: number,
    select_2: number,
    select_3: number,
    score: number,
    qr?: QueryRunner,
  ) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const eduStats = await userEduStatsRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!eduStats) {
      const tunaTvData = {
        user_id,
        tuna_tile,
        ingame_kind,
        select_1,
        select_2,
        select_3,
        score,
        upload_yn: 'N',
        upload_txt: '',
        like_cnt: 0,
      };

      await userEduStatsRepository.insert(tunaTvData);
    } else {
      await userEduStatsRepository.save({
        ...eduStats,
      });
    }

    const result = await userEduStatsRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
  }
}
