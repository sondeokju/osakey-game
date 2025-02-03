import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserAchievements } from './entities/user_achievements.entity';
import { AchieveListService } from 'src/static-table/achieve/achieve_list/achieve_list.service';

@Injectable()
export class UserAchievementsService {
  constructor(
    @InjectRepository(UserAchievements)
    private readonly userAchievementsRepository: Repository<UserAchievements>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly achieveListService: AchieveListService,
    private readonly dataSource: DataSource,
  ) {}

  getUserAchievementsRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserAchievements>(UserAchievements)
      : this.userAchievementsRepository;
  }

  async saveAchieve(
    user_id: string,
    achieve_id: number,
    achieve_count: number,
    progress_status: string,
    qr?: QueryRunner,
  ) {
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
      const userAchievementsRepository =
        queryRunner.manager.getRepository(UserAchievements);

      let userAchieve = await userAchievementsRepository.findOne({
        where: { user_id },
      });

      if (!userAchieve) {
        userAchieve = userAchievementsRepository.create({
          user_id,
          achieve_id,
          achieve_count: 0,
          progress_status: 'N', // 기본 상태
        });
      }

      if (progress_status === 'Y') {
        userAchieve.progress_status = progress_status;
        userAchieve.complete_date = new Date();
      } else {
        userAchieve.achieve_count += +achieve_count;
      }

      const result = await userAchievementsRepository.save(userAchieve);

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

  async achieve(user_id: string, qr?: QueryRunner) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.findOne({
      where: {
        user_id,
      },
    });

    return userAchieve;
  }

  async getUserAchieveAll(user_id: string, qr?: QueryRunner) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.findOne({
      where: {
        user_id,
      },
    });

    return userAchieve;
  }

  async achieveReward(
    user_id: string,
    user_achievements_id: number,
    qr?: QueryRunner,
  ) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.findOne({
      where: {
        id: user_achievements_id,
        user_id,
      },
    });

    if (!userAchieve) {
      throw new NotFoundException('userAchieve not found.');
    }

    const achieveData = await this.achieveListService.getAttendance(
      userAchieve.achieve_id,
      qr,
    );

    if (userAchieve.reward_yn === 'Y') {
      throw new NotFoundException(
        'You have already claimed the Achieve reward.',
      );
    }
    const rewardData = await this.rewardOfferService.reward(
      user_id,
      achieveData.reward_id,
      qr,
    );

    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    userAchieve.reward_yn = 'Y';
    const updatedUserAchieve =
      await userAchievementsRepository.save(userAchieve);

    return {
      success: true,
      reward: rewardData,
      userAchievement: updatedUserAchieve,
    };
  }
}
