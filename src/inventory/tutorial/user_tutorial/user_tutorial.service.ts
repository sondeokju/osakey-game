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
import { UserTutorial } from './entities/user_tutorial.entity';

@Injectable()
export class UserTutorialService {
  constructor(
    @InjectRepository(UserTutorial)
    private readonly userTutorialRepository: Repository<UserTutorial>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly dataSource: DataSource,
  ) {}

  getUserTutorialRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserTutorial>(UserTutorial)
      : this.userTutorialRepository;
  }

  async saveTutorial(
    user_id: string,
    tutorial_id: number,
    tutorial_sub_id: number,
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
      const userTutorialRepository =
        queryRunner.manager.getRepository(UserTutorial);

      let userTutorial = await userTutorialRepository.findOne({
        where: { user_id, tutorial_id },
      });

      if (!userTutorial) {
        userTutorial = userTutorialRepository.create({
          user_id,
          tutorial_id,
        });
      }

      userTutorial.tutorial_sub_id = tutorial_sub_id;

      const result = await userTutorialRepository.save(userTutorial);

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

  async getUserTutorialAll(user_id: string, qr?: QueryRunner) {
    const userTutorialRepository = this.getUserTutorialRepository(qr);
    const userTutorial = await userTutorialRepository.find({
      where: {
        user_id,
      },
    });

    return userTutorial;
  }

  // async achieveReward(
  //   user_id: string,
  //   user_achievements_id: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userAchievementsRepository = this.getUserAchievementsRepository(qr);
  //   const userAchieve = await userAchievementsRepository.findOne({
  //     where: {
  //       id: user_achievements_id,
  //       user_id,
  //     },
  //   });

  //   if (!userAchieve) {
  //     throw new NotFoundException('userAchieve not found.');
  //   }

  //   const achieveData = await this.achieveListService.getAttendance(
  //     userAchieve.achieve_id,
  //     qr,
  //   );

  //   if (userAchieve.reward_yn === 'Y') {
  //     throw new NotFoundException(
  //       'You have already claimed the Achieve reward.',
  //     );
  //   }
  //   const rewardData = await this.rewardOfferService.reward(
  //     user_id,
  //     achieveData.reward_id,
  //     qr,
  //   );

  //   if (!rewardData) {
  //     throw new BadRequestException('Failed to process reward.');
  //   }

  //   userAchieve.reward_yn = 'Y';
  //   const updatedUserAchieve =
  //     await userAchievementsRepository.save(userAchieve);

  //   return {
  //     success: true,
  //     reward: rewardData,
  //     userAchievement: updatedUserAchieve,
  //   };
  // }
}
