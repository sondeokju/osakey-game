import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { QueryRunner, Repository } from 'typeorm';
import { UserOfflineReward } from './entities/user_offline_reward.entity';
import { OfflineService } from 'src/static-table/offline/offline/offline.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserOfflineRewardService {
  dataSource: any;
  constructor(
    @InjectRepository(UserOfflineReward)
    private readonly userOfflineRewardRepository: Repository<UserOfflineReward>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly offlineService: OfflineService,
    private readonly usersService: UsersService,
  ) {}

  getUserOfflineRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserOfflineReward>(UserOfflineReward)
      : this.userOfflineRewardRepository;
  }

  async saveOfflineReward(user_id: string, is_ad: boolean, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    const queryRunner = qr || this.dataSource.createQueryRunner();
    let isTransactionOwner = false;

    if (!qr) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      isTransactionOwner = true;
    }

    try {
      const userOfflineRewardRepository =
        queryRunner.manager.getRepository(UserOfflineReward);
      const usersData = await this.usersService.getMe(user_id, qr);
      const offlineData = await this.offlineService.getOfflineLevel(
        usersData.level,
      );

      // 유저 보상 데이터 가져오기
      let userOfflineReward = await userOfflineRewardRepository.findOne({
        where: { user_id },
      });

      if (!userOfflineReward) {
        userOfflineReward = userOfflineRewardRepository.create({
          user_id,
          last_reward_date: new Date(),
          last_ad_date: new Date('1970-01-01 00:00:00'),
          ad_reward_count: 0,
        });
      }

      // 보상 및 화폐 계산
      const { rewardCount, currencyCount } = this.calculateRewards(
        userOfflineReward.last_reward_date,
        offlineData,
        is_ad,
      );

      console.log('Reward Calculation:', { rewardCount, currencyCount });

      if (is_ad) {
        userOfflineReward.last_reward_date = new Date(); // 마지막 보상 날짜 갱신
      }

      // 보상 처리
      for (let i = 0; i < rewardCount; i++) {
        await this.rewardOfferService.reward(
          user_id,
          offlineData.reward_id,
          qr,
        );
      }

      // 화폐 보상 처리
      let totalGord = 0;
      let totalExp = 0;
      if (currencyCount > 0) {
        totalGord = offlineData.gord_qty * currencyCount;
        totalExp = offlineData.exp_qty * currencyCount;

        await this.rewardOfferService.rewardCurrency(
          user_id,
          'gord',
          totalGord,
          qr,
        );
        await this.rewardOfferService.rewardCurrency(
          user_id,
          'exp',
          totalExp,
          qr,
        );
      }

      await userOfflineRewardRepository.save(userOfflineReward);

      if (isTransactionOwner) {
        await queryRunner.commitTransaction();
      }

      console.log('Offline reward saved successfully:', {
        rewardId: offlineData.reward_id,
        rewardCount,
        gord: totalGord,
        exp: totalExp,
      });

      return {
        offlineReward: {
          rewardId: offlineData.reward_id,
          rewardCount,
          gord: totalGord,
          exp: totalExp,
        },
      };
    } catch (error) {
      if (isTransactionOwner) {
        await queryRunner.rollbackTransaction();
      }
      console.error('Transaction failed:', {
        error: error.message,
        stack: error.stack,
        user_id,
        is_ad,
      });
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      if (isTransactionOwner) {
        await queryRunner.release();
      }
    }
  }

  private calculateRewards(
    lastRewardDate: Date,
    offlineData: any,
    is_ad: boolean,
  ): { rewardCount: number; currencyCount: number } {
    if (is_ad === true) {
      // 광고를 시청한 경우: 최대 보상 시간 기준으로 보상 지급
      const rewardCount = Math.floor(
        offlineData.time_max / offlineData.offline_reward_peirod,
      );

      const currencyCount = offlineData.time_max;

      return { rewardCount, currencyCount };
    } else {
      // 광고를 시청하지 않은 경우: 실제 경과 시간 기준으로 보상 지급
      const rewardCount = this.calculateOfflineRewards(
        lastRewardDate,
        offlineData.offline_reward_peirod,
      );

      let currencyCount = this.calculateOfflineRewards(lastRewardDate, 1); // 1분 기준
      currencyCount = Math.min(currencyCount, 480); // 480 제한

      return { rewardCount, currencyCount };
    }
  }

  calculateOfflineRewards(
    lastRewardDate: Date,
    offlineRewardPeriod: number,
  ): number {
    const currentTime = new Date(); // 현재 시간
    const timeDifference = currentTime.getTime() - lastRewardDate.getTime(); // 경과 시간 (밀리초 단위)
    const periodInMilliseconds = offlineRewardPeriod * 60 * 1000; // 기간 (밀리초 단위, 분 기준)

    console.log('timeDifference', timeDifference);
    console.log('periodInMilliseconds', periodInMilliseconds);
    // 경과한 보상 가능한 횟수 계산
    return Math.floor(timeDifference / periodInMilliseconds);
  }

  async getUserOfflineReward(user_id: string, qr?: QueryRunner) {
    const userOfflineRewardRepository = this.getUserOfflineRewardRepository(qr);
    const userOfflineReward = await userOfflineRewardRepository.findOne({
      where: {
        user_id,
      },
    });

    return userOfflineReward;
  }
}
