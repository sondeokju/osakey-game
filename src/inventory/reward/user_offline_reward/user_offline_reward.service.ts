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

@Injectable()
export class UserOfflineRewardService {
  dataSource: any;
  constructor(
    @InjectRepository(UserOfflineReward)
    private readonly userOfflineRewardRepository: Repository<UserOfflineReward>, //  private readonly rewardOfferService: RewardOfferService,
  ) {}

  getUserOfflineRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserOfflineReward>(UserOfflineReward)
      : this.userOfflineRewardRepository;
  }

  async saveOfflineReward(
    user_id: string,
    last_reward_date?: Date,
    last_ad_date?: Date,
    ad_reward_count?: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    // const currentDate = new Date(); // 현재 날짜와 시간
    // const deadline = new Date(currentDate); // 현재 날짜 복사
    // deadline.setDate(deadline.getDate() + +deadline_day); // 7일 추가

    const queryRunner = qr || this.dataSource.createQueryRunner();

    console.log('last_reward_date', last_reward_date);
    console.log('last_ad_date', last_ad_date, typeof last_ad_date);

    let isTransactionOwner = false;
    if (!qr) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      isTransactionOwner = true;
    }

    try {
      const userOfflineRewardRepository =
        queryRunner.manager.getRepository(UserOfflineReward);

      let userOfflineReward = await userOfflineRewardRepository.findOne({
        where: { user_id },
      });

      if (!userOfflineReward) {
        userOfflineReward = userOfflineRewardRepository.create({
          user_id,
          last_reward_date: last_reward_date || new Date('1970-01-01 00:00:00'),
          last_ad_date: last_ad_date || new Date('1970-01-01 00:00:00'),
          ad_reward_count: ad_reward_count ?? 0,
        });
      } else {
        // 기존 레코드 업데이트 시 조건부 처리
        if (last_reward_date !== undefined) {
          userOfflineReward.last_reward_date = last_reward_date;
        }
        if (last_ad_date !== undefined) {
          userOfflineReward.last_ad_date = last_ad_date;
        }
        if (ad_reward_count !== undefined) {
          userOfflineReward.ad_reward_count += +ad_reward_count;
        }
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
