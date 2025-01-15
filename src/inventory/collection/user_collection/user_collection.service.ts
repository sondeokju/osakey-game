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
import { CollectionBossService } from 'src/static-table/collection/collection_boss/collection_boss.service';
import { CollectionEquipService } from 'src/static-table/collection/collection_equip/collection_equip.service';
import { CollectionNpcService } from 'src/static-table/collection/collection_npc/collection_npc.service';
import { CollectionSuitService } from 'src/static-table/collection/collection_suit/collection_suit.service';

@Injectable()
export class UserCollectionService {
  constructor(
    @InjectRepository(UserCollection)
    private readonly userCollectionRepository: Repository<UserCollection>,
    private readonly dataSource: DataSource,
    private readonly rewardOfferService: RewardOfferService,
    private readonly collectionBossService: CollectionBossService,
    private readonly collectionEquipService: CollectionEquipService,
    private readonly collectionNpcService: CollectionNpcService,
    private readonly collectionSuitService: CollectionSuitService,
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
  async collectionType(
    collection_type: string,
    collecton_id: number,
    qr?: QueryRunner,
  ) {
    let collectionRewardID;

    switch (collection_type) {
      case 'BOSS':
        collectionRewardID = await this.collectionBossService.getCollectionBoss(
          collecton_id,
          qr,
        );
        break;

      case 'EQUIP':
        collectionRewardID =
          await this.collectionEquipService.getCollectionEquip(
            collecton_id,
            qr,
          );
        break;

      case 'NPC':
        collectionRewardID = await this.collectionNpcService.getCollectionNpc(
          collecton_id,
          qr,
        );
        break;

      case 'SUIT':
        collectionRewardID = await this.collectionSuitService.getCollectionSuit(
          collecton_id,
          qr,
        );
        break;

      default:
        throw new Error(`Invalid collection type: ${collection_type}`);
    }

    return +collectionRewardID;
  }

  async collectionReward(
    user_id: string,
    user_collection_id: number,
    qr?: QueryRunner,
  ) {
    console.log(user_collection_id);
    const userCollectionRepository = this.getUserCollectionRepository(qr);
    const userCollectionData = await userCollectionRepository.findOne({
      where: {
        id: user_collection_id,
        user_id,
      },
    });

    console.log('1');

    if (!userCollectionData) {
      throw new NotFoundException('userCollectionData not found.');
    }

    if (userCollectionData.reward_yn === 'Y') {
      throw new NotFoundException(
        'You have already claimed the Collection reward.',
      );
    }

    const reward_id = await this.collectionType(
      userCollectionData.collection_type,
      userCollectionData.collection_id,
    );

    console.log('2');

    const rewardData = await this.rewardOfferService.reward(
      user_id,
      reward_id,
      qr,
    );

    console.log('3');
    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    const updatedUserCollection = await userCollectionRepository.save({
      ...userCollectionData,
      reward_yn: 'Y',
    });

    console.log('4');
    return {
      success: true,
      reward: rewardData,
      userCollection: updatedUserCollection,
    };
  }
}
