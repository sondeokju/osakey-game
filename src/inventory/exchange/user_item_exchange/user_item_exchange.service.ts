import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItemExchange } from './entities/user_item_exchange.entity';
import { ItemExchangeService } from 'src/static-table/exchange/item_exchange/item_exchange.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';

@Injectable()
export class UserItemExchangeService {
  constructor(
    @InjectRepository(UserItemExchange)
    private readonly userItemExchangeRepository: Repository<UserItemExchange>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly itemExchangeService: ItemExchangeService,
    private readonly userItemService: UserItemService,
    private readonly resourceManagerService: ResourceManagerService,
  ) {}

  getUserItemExchangeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserItemExchange>(UserItemExchange)
      : this.userItemExchangeRepository;
  }

  async getItemExchange(user_id: string, qr?: QueryRunner) {
    const userItemExchangeRepository = this.getUserItemExchangeRepository(qr);
    const exchangeData = await userItemExchangeRepository.find({
      where: {
        user_id,
      },
    });
    const result = {
      //item_id: exchangeData[0].result_item_id,
      //item_count: exchangeData[0].result_item_count,
    };
    return exchangeData;
  }

  async ItemExchange(
    user_id: string,
    id: number,
    exchange_item_count: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    const userItemExchangeRepository = this.getUserItemExchangeRepository(qr);

    try {
      const itemExchangeData =
        await this.itemExchangeService.getItemExchangeId(id);
      if (!itemExchangeData) {
        return {
          message: `item_exchange ${id} data not found`,
          errorCode: 'ITEM_EXCHANGE_NOT_FOUND',
          status: 404,
        };
      }

      const userItemData = await this.userItemService.getItem(
        user_id,
        itemExchangeData.exchange_item_id,
      );

      if (!userItemData) {
        return {
          message: `user_item item_id: ${itemExchangeData.exchange_item_id} data not found`,
          errorCode: 'USER_ITEM_NOT_FOUND',
          status: 404,
        };
      }

      if (
        userItemData.item_count <= 0 ||
        userItemData.item_count < exchange_item_count
      ) {
        return {
          message: `user_item item_id: ${itemExchangeData.exchange_item_id} item not enough`,
          errorCode: 'INSUFFICIENT_ITEMS',
          status: 400,
        };
      }

      const rewardItemCount =
        itemExchangeData.result_item_qty * exchange_item_count;

      // 트랜잭션 사용 여부 확인
      let useTransaction = false;
      if (!qr) {
        qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();
        useTransaction = true;
      }

      try {
        const insertItemExchange = userItemExchangeRepository.create({
          user_id,
          exchange_item_id: itemExchangeData.exchange_item_id,
          exchange_item_count,
          result_item_id: itemExchangeData.result_item_id,
          result_item_count: itemExchangeData.result_item_qty,
        });

        await this.resourceManagerService.validateAndDeductResources(
          user_id,
          {
            item: {
              item_id: itemExchangeData.exchange_item_id,
              count: exchange_item_count,
            },
          },
          qr,
        );

        const rewardData = await this.rewardOfferService.rewardItem(
          user_id,
          itemExchangeData.result_item_id,
          rewardItemCount,
        );

        const savedData =
          await userItemExchangeRepository.save(insertItemExchange);

        if (useTransaction) {
          await qr.commitTransaction();
        }

        return {
          reward: rewardData,
          userItemExchangeData: savedData,
        };
      } catch (transactionError) {
        if (useTransaction) {
          await qr.rollbackTransaction();
        }
        console.error('Transaction failed:', transactionError);
        throw new InternalServerErrorException(
          'Failed to process item exchange.',
        );
      } finally {
        if (useTransaction) {
          await qr.release();
        }
      }
    } catch (error) {
      console.error('Error processing item exchange:', error);
      throw new InternalServerErrorException(
        'An error occurred during item exchange.',
      );
    }
  }

  async saveItemExchange(
    user_id: string,
    exchange_user_item_id: number,
    exchange_item_count: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    const userItemExchangeRepository = this.getUserItemExchangeRepository(qr);

    try {
      const userItemData = await this.userItemService.getUserItemID(
        user_id,
        exchange_user_item_id,
      );

      if (!userItemData) {
        return {
          message: 'UserItem data not found',
          //errorCode: 'ITEM_EXCHANGE_NOT_FOUND',
          //status: 404,
          //itemId: userItemData.item_id,
        };
      }

      console.log('userItemData', userItemData);
      const itemExchangeData = await this.itemExchangeService.getItemExchange(
        userItemData.item_id,
      );
      if (!itemExchangeData) {
        return {
          message: 'Item exchange data not found',
          //errorCode: 'ITEM_EXCHANGE_NOT_FOUND',
          //status: 404,
          //itemId: userItemData.item_id,
        };
      }

      const rewardItemCount =
        itemExchangeData.result_item_qty * exchange_item_count;

      if (
        userItemData.item_count <= 0 ||
        userItemData.item_count < exchange_item_count
      ) {
        return {
          message: 'item not enough',
        };
      }

      const insertItemExchange = userItemExchangeRepository.create({
        user_id,
        exchange_item_id: userItemData.item_id,
        exchange_item_count,
        result_item_id: itemExchangeData.result_item_id,
        result_item_count: rewardItemCount,
      });

      await this.rewardOfferService.rewardItem(
        user_id,
        itemExchangeData.result_item_id,
        rewardItemCount,
      );

      await this.resourceManagerService.validateAndDeductResources(
        user_id,
        {
          item: {
            item_id: userItemData.item_id,
            count: exchange_item_count,
          },
        },
        qr,
      );

      const savedData =
        await userItemExchangeRepository.save(insertItemExchange);
      return savedData;
    } catch (error) {
      console.error('Error saving itemexchange:', error);
      throw new InternalServerErrorException(
        'Failed to save user itemexchange.',
      );
    }
  }
}
