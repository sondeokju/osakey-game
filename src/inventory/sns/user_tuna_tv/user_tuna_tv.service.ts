import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTunaTv } from './entities/user_tuna_tv.entity';
import { QueryRunner, Repository } from 'typeorm';
// import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
// import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
// import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
// import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';

@Injectable()
export class UserTunaTvService {
  constructor(
    @InjectRepository(UserTunaTv)
    private readonly userTunaTvRepository: Repository<UserTunaTv>,
  ) //private readonly redisService: RedisService,
  // private readonly snsConfigService: SnsConfigService,
  // private readonly snsLevelService: SnsLevelService,
  // private readonly snsLikeRuleService: SnsLikeRuleService,
  // private readonly snsRewardService: SnsRewardService,
  {}

  getUserTunaTvRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserTunaTv>(UserTunaTv)
      : this.userTunaTvRepository;
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
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);

    const tunaTvData = {
      user_id,
      tuna_tile,
      ingame_kind,
      select_1,
      select_2,
      select_3,
      score,
      upload_yn: 'N',
      upload_txt: 'N',
      like_cnt: 0,
    };

    await userTunaTvRepository.insert(tunaTvData);

    return tunaTvData;
  }

  async tunaTvUpload(tunaTv_id: number, upload_txt: string, qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);
    const userTunaTvData = await userTunaTvRepository.findOne({
      where: {
        id: tunaTv_id,
      },
    });

    if (!userTunaTvData) {
      return { message: 'tuna tv no data' };
    } else {
      await userTunaTvRepository.save({
        ...userTunaTvData,
        upload_yn: 'Y',
        upload_txt,
      });

      const result = await userTunaTvRepository.find({
        where: {
          upload_yn: 'Y',
        },
      });

      return result;
    }
  }

  async getTunaTv(tunaTv_id: number, qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);
    const userTunaTvData = await userTunaTvRepository.findOne({
      where: {
        id: tunaTv_id,
      },
    });

    if (!userTunaTvData) {
      throw new NotFoundException('Tuna TV not found');
    }

    return userTunaTvData;
  }

  async tunaTvOnlineList(qr?: QueryRunner) {
    const onlineTvData = {
      hot: this.tunaTvHotOne(qr),
      trend: this.tunaTvHotOne(qr),
      new: this.tunaTvHotOne(qr),
    };

    return onlineTvData;
  }

  async tunaTvHotOne(qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);

    const TunaTvHotData = await userTunaTvRepository
      .createQueryBuilder('user_tuna_tv')
      .where('user_tuna_tv.createdAt >= :startTime', {
        startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
      })
      .orderBy('user_tuna_tv.like_cnt', 'DESC')
      .limit(100)
      .getMany();

    const randomOne = TunaTvHotData.sort(() => Math.random() - 0.5).slice(0, 1);

    return randomOne;
  }

  async tunaTvTrendTwo(qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);

    const TunaTvHotData = await userTunaTvRepository
      .createQueryBuilder('user_tuna_tv')
      .where('user_tuna_tv.createdAt >= :startTime', {
        startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      })
      .orderBy('user_tuna_tv.like_cnt', 'DESC')
      .limit(100)
      .getMany();

    const randomTwo = TunaTvHotData.sort(() => Math.random() - 0.5).slice(0, 2);

    return randomTwo;
  }

  async tunaTvNewTwo(qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);

    const TunaTvHotData = await userTunaTvRepository
      .createQueryBuilder('user_tuna_tv')
      .where('user_tuna_tv.createdAt >= :startTime', {
        startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      })
      .orderBy('user_tuna_tv.like_cnt', 'DESC')
      .limit(100)
      .getMany();

    const randomTwo = TunaTvHotData.sort(() => Math.random() - 0.5).slice(0, 2);

    return randomTwo;
  }
}
