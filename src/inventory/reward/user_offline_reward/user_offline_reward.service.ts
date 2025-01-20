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

  async saveOfflineReward(user_id: string, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    // const currentDate = new Date(); // 현재 날짜와 시간
    // const deadline = new Date(currentDate); // 현재 날짜 복사
    // deadline.setDate(deadline.getDate() + +deadline_day); // 7일 추가

    const queryRunner = qr || this.dataSource.createQueryRunner();

    // console.log('last_reward_date', last_reward_date);
    // console.log('last_ad_date', last_ad_date, typeof last_ad_date);

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

      let userOfflineReward = await userOfflineRewardRepository.findOne({
        where: { user_id },
      });

      let rewardCount = 0;

      if (!userOfflineReward) {
        userOfflineReward = userOfflineRewardRepository.create({
          user_id,
          last_reward_date: new Date(),
          last_ad_date: new Date('1970-01-01 00:00:00'),
          ad_reward_count: 0,
        });
        //rewardCount = 0;
      } else {
        rewardCount = this.calculateOfflineRewards(
          userOfflineReward.last_reward_date,
          offlineData.offline_reward_peirod,
        );

        console.log('rewardCount', rewardCount);
        userOfflineReward.last_reward_date = new Date();
      }

      for (let i = 1; i <= rewardCount; i++) {
        await this.rewardOfferService.reward(
          user_id,
          offlineData.reward_id,
          qr,
        );
      }

      const result = await userOfflineRewardRepository.save(userOfflineReward);

      if (isTransactionOwner) {
        await queryRunner.commitTransaction();
      }

      return result;
    } catch (error) {
      if (isTransactionOwner) {
        await queryRunner.rollbackTransaction();
      }
      console.error('Transaction failed:', error);
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      if (isTransactionOwner) {
        await queryRunner.release();
      }
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

  async offlineRewardList(user_id: string, qr?: QueryRunner) {
    const userOfflineRewardRepository = this.getUserOfflineRewardRepository(qr);
    const userOfflineReward = await userOfflineRewardRepository.find({
      where: {
        user_id,
      },
    });

    return userOfflineReward;
  }
}
