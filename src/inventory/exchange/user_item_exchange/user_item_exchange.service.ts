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

@Injectable()
export class UserItemExchangeService {
  constructor(
    @InjectRepository(UserItemExchange)
    private readonly userItemExchangeRepository: Repository<UserItemExchange>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly itemExchangeService: ItemExchangeService,
    private readonly userItemService: UserItemService,
  ) {}

  getUserItemExchangeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserItemExchange>(UserItemExchange)
      : this.userItemExchangeRepository;
  }

  async getItemExchange(user_id: string, qr?: QueryRunner) {
    const userItemExchangeRepository = this.getUserItemExchangeRepository(qr);
    const result = await userItemExchangeRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }

  async saveItemExchange(
    user_id: string,
    exchange_item_id: number,
    exchange_item_count: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    const userItemExchangeRepository = this.getUserItemExchangeRepository(qr);

    try {
      const itemExchangeData =
        await this.itemExchangeService.getItemExchange(exchange_item_id);
      const userItemData = await this.userItemService.getItem(
        user_id,
        exchange_item_id,
      );

      const rewardItemCount =
        itemExchangeData.result_item_qty * exchange_item_count;

      console.log('userItemData', userItemData);

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
        exchange_item_id,
        exchange_item_count,
        result_item_id: itemExchangeData.result_item_id,
        result_item_count: rewardItemCount,
      });

      await this.rewardOfferService.rewardItem(
        user_id,
        itemExchangeData.result_item_id,
        rewardItemCount,
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
