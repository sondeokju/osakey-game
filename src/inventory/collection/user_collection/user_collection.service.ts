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
import { UserCollection } from './entities/user_collection.entity';

@Injectable()
export class UserCollectionService {
  constructor(
    @InjectRepository(UserCollection)
    private readonly userCollectionRepository: Repository<UserCollection>,
    private readonly dataSource: DataSource, //private readonly rewardOfferService: RewardOfferService,
  ) {}

  getUserCollectionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserCollection>(UserCollection)
      : this.userCollectionRepository;
  }

  async saveCollection(
    user_id: string,
    collection_type: string,
    collection_id: number,
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
      const userCollectionepository =
        queryRunner.manager.getRepository(UserCollection);

      const currentDate = new Date(); // 현재 날짜와 시간
      const createCollectionDate = new Date(currentDate); // 현재 날짜 복사
      // deadline.setDate(deadline.getDate() + +deadline_day); // 7일 추가

      await userCollectionepository.insert({
        user_id,
        collection_type,
        collection_id,
        collection_yn: 'Y',
        collection_enable_date: createCollectionDate,
        reward_date: new Date('1970-01-01 00:00:00'),
      });

      if (isTransactionOwner) {
        await queryRunner.commitTransaction();
      }

      const userMailData = await userCollectionepository.find({
        where: { user_id },
      });

      return userMailData;
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

  async userCollectionList(user_id: string, qr?: QueryRunner) {
    const userCollectionRepository = this.getUserCollectionRepository(qr);
    const userCollection = await userCollectionRepository.find({
      where: {
        user_id,
      },
    });

    return userCollection;
  }

  // async mailReward(user_id: string, user_mail_id: number, qr?: QueryRunner) {
  //   const userMailRepository = this.getUserMailRepository(qr);
  //   const userMailData = await userMailRepository.findOne({
  //     where: {
  //       id: user_mail_id,
  //       user_id,
  //     },
  //   });

  //   if (!userMailData) {
  //     throw new NotFoundException('userMailData not found.');
  //   }

  //   if (userMailData.reward_yn === 'Y') {
  //     throw new NotFoundException(
  //       'You have already claimed the userMailData reward.',
  //     );
  //   }
  //   const rewardData = await this.rewardOfferService.reward(
  //     user_id,
  //     userMailData.reward_id,
  //     qr,
  //   );

  //   if (!rewardData) {
  //     throw new BadRequestException('Failed to process reward.');
  //   }

  //   userMailData.reward_yn = 'Y';
  //   const updatedUserMail = await userMailRepository.save(userMailData);

  //   return {
  //     success: true,
  //     reward: rewardData,
  //     userMission: updatedUserMail,
  //   };
  // }
}
