import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTunaTv } from './entities/user_tuna_tv.entity';
import { QueryRunner, Repository } from 'typeorm';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLikesService } from '../sns_likes/sns_likes.service';

@Injectable()
export class UserTunaTvService {
  constructor(
    @InjectRepository(UserTunaTv)
    private readonly userTunaTvRepository: Repository<UserTunaTv>,
    private readonly snsConfigService: SnsConfigService,
    private readonly snsLikesService: SnsLikesService,
  ) {}

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
    const tunaTvCount = await userTunaTvRepository.count({
      where: {
        user_id,
      },
    });

    const snsConfig =
      await this.snsConfigService.getSnsConfig('save_thumbnail_max');

    if (tunaTvCount === snsConfig.option) {
      return { message: 'tuna tv over 15' };
    }

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

  async TunaTvDelete(tuna_tv_id: number, qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);
    const userTunaTvData = await userTunaTvRepository.find({
      where: {
        id: tuna_tv_id,
      },
    });

    if (!userTunaTvData) {
      throw new NotFoundException('Tuna TV not found');
    }

    const deleteData = await userTunaTvRepository.remove(userTunaTvData);
    return deleteData;
  }

  async TunaTvList(user_id: number, qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);
    const userTunaTvData = await userTunaTvRepository.find({
      where: {
        user_id: user_id,
      },
    });

    if (!userTunaTvData) {
      throw new NotFoundException('Tuna TV not found');
    }

    return userTunaTvData;
  }

  async TunaTvLikeAdd(user_id: number, tuna_tv_id: number, qr?: QueryRunner) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);
    const userTunaTvData = await userTunaTvRepository.findOne({
      where: {
        id: tuna_tv_id,
      },
    });

    if (!userTunaTvData) {
      throw new NotFoundException('Tuna TV not found');
    }

    const islike = await this.snsLikesService.isLiked(user_id, tuna_tv_id);

    if (!islike) {
      await this.snsLikesService.addLike(user_id, tuna_tv_id);
      await userTunaTvRepository.increment({ id: tuna_tv_id }, 'like_cnt', 1);
    } else {
      throw new NotFoundException('like exist');
    }

    const updateData = await userTunaTvRepository.findOne({
      where: {
        id: tuna_tv_id,
      },
    });

    return updateData;
  }

  async TunaTvLikeDelete(
    user_id: number,
    tuna_tv_id: number,
    qr?: QueryRunner,
  ) {
    const userTunaTvRepository = this.getUserTunaTvRepository(qr);
    const userTunaTvData = await userTunaTvRepository.findOne({
      where: {
        id: tuna_tv_id,
      },
    });

    if (!userTunaTvData) {
      throw new NotFoundException('Tuna TV not found');
    }

    const islike = await this.snsLikesService.isLiked(user_id, tuna_tv_id);

    if (islike) {
      await this.snsLikesService.deleteLike(user_id, tuna_tv_id);
      await userTunaTvRepository.decrement({ id: tuna_tv_id }, 'like_cnt', 1);
    } else {
      throw new NotFoundException('like not exist');
    }

    const updateData = await userTunaTvRepository.findOne({
      where: {
        id: tuna_tv_id,
      },
    });

    return updateData;
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
