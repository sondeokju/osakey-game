import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsLevel } from './entities/user_sns_level.entity';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';

@Injectable()
export class UserSnsLevelService {
  constructor(
    @InjectRepository(UserSnsLevel)
    private readonly userSnsLevelRepository: Repository<UserSnsLevel>,
    private readonly snsLevelService: SnsLevelService,
    private readonly snsRewardService: SnsRewardService,
    private readonly userTunaTvService: UserTunaTvService,
    private readonly rewardOfferService: RewardOfferService,
  ) {}

  getUserSnsLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsLevel>(UserSnsLevel)
      : this.userSnsLevelRepository;
  }

  async snsReward(user_id: string, tuna_tv_id: number, qr?: QueryRunner) {
    const userSnsLevelRepository = this.getUserSnsLevelRepository(qr);
    const userSnsLevelData = await userSnsLevelRepository.findOne({
      where: { user_id },
    });

    if (!userSnsLevelData) {
      await userSnsLevelRepository.insert({
        user_id,
        sns_level: 1,
        sns_exp: 0,
        sns_reward_id: 0,
        reward_yn: 'N',
      });
    }

    const updateUserSnsLevelData = await userSnsLevelRepository.findOne({
      where: { user_id },
    });
    const tunaTvData = await this.userTunaTvService.getTunaTv(tuna_tv_id, qr);
    const snsReward = await this.snsRewardService.getSnsReward(
      tunaTvData.like_cnt,
      qr,
    );

    const levelUpExp =
      (updateUserSnsLevelData?.sns_exp || 0) + snsReward.sns_reward_exp;

    const snsLevel = await this.snsLevelService.getSnsExp(levelUpExp, qr);
    const updateSnsLevel = snsLevel?.sns_level || 1;
    const updateRewardId = snsLevel?.reward_id || 0;
    //11600001
    console.log('levelUpExp:', levelUpExp);
    console.log('snsLevel:', snsLevel);
    console.log('updateSnsLevel:', updateSnsLevel);
    console.log('updateRewardId:', updateRewardId);

    await userSnsLevelRepository.save({
      ...updateUserSnsLevelData,
      sns_level: updateSnsLevel,
      sns_exp: levelUpExp,
      sns_reward_id: updateRewardId,
      rward_yn: 'Y',
    });

    const likeRewardData = await this.rewardOfferService.reward(
      user_id,
      snsReward.reward_id,
      qr,
    );
    console.log('likeRewardData:', likeRewardData);

    let levelRewardData = {};

    if (updateSnsLevel > updateUserSnsLevelData.sns_level) {
      levelRewardData = await this.rewardOfferService.reward(
        user_id,
        updateRewardId,
        qr,
      );
      console.log('levelRewardData:', levelRewardData);
    }

    const mergedRewards = this.mergeRewards(likeRewardData, levelRewardData);

    // const returnUserSnsLevelData = await userSnsLevelRepository.findOne({
    //   where: { user_id },
    // });

    // const reward = {
    //   userItemData: [...likeRewardData, ...levelRewardData],
    // };

    // const reward = {
    //   userItemData: [
    //     ...likeRewardData,
    //     ...(Object.keys(levelRewardData).length > 0 ? [levelRewardData] : []),
    //   ].filter((item) => Object.keys(item).length > 0), // 빈 객체 제거
    // };

    const result = {
      mergedRewards,
      //level_reward: levelRewardData,
      //user_sns_level: returnUserSnsLevelData,
    };

    return result;
  }

  mergeRewards = (likeRewardData, levelRewardData) => {
    const rewardMap = new Map();

    [...likeRewardData, ...levelRewardData].forEach(
      ({ item_id, item_count }) => {
        if (rewardMap.has(item_id)) {
          rewardMap.set(item_id, rewardMap.get(item_id) + item_count);
        } else {
          rewardMap.set(item_id, item_count);
        }
      },
    );

    return Array.from(rewardMap, ([item_id, item_count]) => ({
      item_id,
      item_count,
    }));
  };

  async getSnsLevel(user_id: string, qr?: QueryRunner) {
    const userSnsLevelRepository = this.getUserSnsLevelRepository(qr);
    const userSnsLevelData = await userSnsLevelRepository.findOne({
      where: { user_id },
    });

    return userSnsLevelData ?? {};
  }

  async getSnsLevelAll(user_id: string, qr?: QueryRunner) {
    const userSnsLevelRepository = this.getUserSnsLevelRepository(qr);
    const userSnsLevelData = await userSnsLevelRepository.find({
      where: { user_id },
    });

    return userSnsLevelData;
  }
}
