import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsLevel } from './entities/user_sns_level.entity';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';

@Injectable()
export class UserSnsLevelService {
  constructor(
    @InjectRepository(UserSnsLevel)
    private readonly userSnsLevelRepository: Repository<UserSnsLevel>,
    private readonly snsLevelService: SnsLevelService,
    private readonly snsRewardService: SnsRewardService,
    private readonly userTunaTvService: UserTunaTvService,
  ) {}

  getUserSnsLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsLevel>(UserSnsLevel)
      : this.userSnsLevelRepository;
  }

  async snsReward(user_id: number, tuna_tv_id: number, qr?: QueryRunner) {
    const userSnsLevelRepository = this.getUserSnsLevelRepository(qr);

    const userSnsLevelData = await userSnsLevelRepository.findOne({
      where: { user_id },
    });

    if (!userSnsLevelData) {
      return { message: 'sns level no data' };
    }

    const tuna_tv_data = await this.userTunaTvService.getTunaTv(tuna_tv_id);
    const snsReward = await this.snsRewardService.getSnsReward(
      tuna_tv_data.like_cnt,
    );

    const levelUpExp = userSnsLevelData.sns_exp + snsReward.sns_reward_exp;
    const snsLevel = await this.snsLevelService.getSnsExp(levelUpExp);

    if (userSnsLevelData.sns_exp < snsReward.sns_reward_exp) {
      await userSnsLevelRepository.save({
        ...userSnsLevelData,
        sns_level: snsLevel.sns_level,
        sns_exp: levelUpExp,
      });
    }

    const updatedUserSnsLevelData = await userSnsLevelRepository.findOne({
      where: { user_id },
    });

    return updatedUserSnsLevelData;
  }

  // async snsReward(user_id: number, tuna_tv_id: number, qr?: QueryRunner) {
  //   const userSnsLevelRepository = this.getUserSnsLevelRepository(qr);
  //   const userSnsLevelData = await userSnsLevelRepository.findOne({
  //     where: {
  //       user_id: user_id,
  //     },
  //   });

  //   const tuna_tv_data = await this.userTunaTvService.getTunaTv(tuna_tv_id);

  //   const snsReward = await this.snsRewardService.getSnsReward(
  //     tuna_tv_data.like_cnt,
  //   );

  //   const levelUpExp = userSnsLevelData.sns_exp + snsReward.sns_reward_exp;

  //   const snsLevel = await this.snsLevelService.getSnsExp(levelUpExp);

  //   if (!userSnsLevelData) {
  //     return { message: 'sns level no data' };
  //   } else {
  //     if (userSnsLevelData.sns_exp >= snsReward.sns_reward_exp) {
  //       await userSnsLevelRepository.save({
  //         ...userSnsLevelData,
  //         sns_level: snsLevel.sns_level,
  //         sns_exp: levelUpExp,
  //       });
  //     }

  //     const result = await userSnsLevelRepository.findOne({
  //       where: {
  //         user_id: user_id,
  //       },
  //     });

  //     return result;
  //   }
  // }
}
