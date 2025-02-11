import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
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
    private readonly dataSource: DataSource,
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
    if (exchange_item_count <= 0) {
      throw new BadRequestException(
        'Exchange item count must be greater than zero.',
      );
    }

    const userItemExchangeRepository = this.getUserItemExchangeRepository(qr);
    let useTransaction = false;

    try {
      // QueryRunner가 없는 경우 트랜잭션 시작
      if (!qr) {
        qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();
        useTransaction = true;
      }

      // 아이템 교환 정보 조회
      const itemExchangeData =
        await this.itemExchangeService.getItemExchangeId(id);
      if (!itemExchangeData) {
        throw new NotFoundException(`ItemExchange ${id} data not found.`);
      }

      // 사용자 아이템 조회
      const userItemData = await this.userItemService.getItem(
        user_id,
        itemExchangeData.exchange_item_id,
        qr, // QueryRunner 전달
      );

      if (!userItemData) {
        throw new NotFoundException(
          `User item_id: ${itemExchangeData.exchange_item_id} data not found.`,
        );
      }

      if (userItemData.item_count < exchange_item_count) {
        throw new BadRequestException(
          `User item_id: ${itemExchangeData.exchange_item_id} is not enough.`,
        );
      }

      // 보상 개수 계산
      const rewardItemCount =
        itemExchangeData.result_item_qty * exchange_item_count;

      // 교환 내역 저장
      const insertItemExchange = userItemExchangeRepository.create({
        user_id,
        exchange_item_id: itemExchangeData.exchange_item_id,
        exchange_item_count,
        result_item_id: itemExchangeData.result_item_id,
        result_item_count: rewardItemCount,
      });

      // 리소스 검증 및 차감, 반드시 `qr`을 넘겨줌
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

      // 보상 지급
      const rewardData = await this.rewardOfferService.rewardItem(
        user_id,
        itemExchangeData.result_item_id,
        rewardItemCount,
        qr, // QueryRunner 전달
      );

      // 교환 정보 저장
      const savedData =
        await userItemExchangeRepository.save(insertItemExchange);

      // 트랜잭션 커밋
      if (useTransaction) {
        await qr.commitTransaction();
      }

      return {
        reward: rewardData, // 보상 배열 반환
        userItemExchangeData: savedData,
      };
    } catch (error) {
      if (useTransaction) {
        await qr.rollbackTransaction();
      }
      console.error('❌ Error in ItemExchange:', error.message);
      throw new InternalServerErrorException(
        'An error occurred during item exchange.',
      );
    } finally {
      if (useTransaction) {
        await qr.release();
      }
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
