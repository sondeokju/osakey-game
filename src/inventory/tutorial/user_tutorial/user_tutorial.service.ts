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
import { GameLogsService } from 'src/game_log/game_logs/game_logs.service';
import { LogType } from 'src/common/const/log-type.enum';

@Injectable()
export class UserTutorialService {
  constructor(
    @InjectRepository(UserTutorial)
    private readonly userTutorialRepository: Repository<UserTutorial>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly tutorialRewardService: TutorialRewardService,
    private readonly dataSource: DataSource,
    private readonly gameLogsService: GameLogsService,
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

    console.log('tutorial_id', tutorial_id);
    console.log('tutorial_sub_id', tutorial_sub_id);
    const queryRunner = qr || this.dataSource.createQueryRunner();
    let rewardData = {};

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

      if (!tutorialRewardData) {
        throw new BadRequestException('No tutorial data found.');
      }

      // console.log('tutorialRewardData.reward_id', tutorialRewardData.reward_id);
      if (tutorialRewardData.reward_id && tutorialRewardData.reward_id > 0) {
        rewardData = await this.rewardOfferService.reward(
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

      // 투토리얼 로그
      const tutorialLog = {
        tutorial_id,
        tutorial_sub_id,
        userItemData: rewardData ?? [],
        userTutorial: updatedUserTutorial,
      };

      await this.gameLogsService.insertLog(
        LogType.PLAYER_TUTORIAL,
        user_id,
        tutorialLog,
      );

      return {
        reward: {
          userItemData: rewardData ?? [],
        },

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
