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
import { TutorialRewardService } from 'src/static-table/tutorial/tutorial_reward/tutorial_reward.service';

@Injectable()
export class UserTutorialService {
  constructor(
    @InjectRepository(UserTutorial)
    private readonly userTutorialRepository: Repository<UserTutorial>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly tutorialRewardService: TutorialRewardService,
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

      const tutorialRewardData =
        await this.tutorialRewardService.getTutorialReward(tutorial_sub_id, qr);

      if (tutorialRewardData.reward_id > 0) {
        const rewardData = await this.rewardOfferService.reward(
          user_id,
          tutorialRewardData.reward_id,
          qr,
        );

        if (!rewardData) {
          throw new BadRequestException('Failed to process reward.');
        }

        userTutorial.reward_yn = 'Y';
      }

      userTutorial.tutorial_sub_id = tutorial_sub_id;

      const updatedUserTutorial =
        await userTutorialRepository.save(userTutorial);

      if (isTransactionOwner) {
        await queryRunner.commitTransaction();
      }

      return {
        reward: rewardData,
        userTutorial: updatedUserTutorial,
      };
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
}
