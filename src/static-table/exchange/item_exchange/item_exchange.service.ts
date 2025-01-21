import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ItemExchange } from './entities/item_exchange.entity';

@Injectable()
export class ItemExchangeService {
  constructor(
    @InjectRepository(ItemExchange)
    private readonly itemExchangeRepository: Repository<ItemExchange>,
  ) {}

  getItemExchangeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<ItemExchange>(ItemExchange)
      : this.itemExchangeRepository;
  }

  async getItemExchangeAll(qr?: QueryRunner) {
    const itemExchangeRepository = this.getItemExchangeRepository(qr);
    const result = await itemExchangeRepository.find({});
    return result;
  }

  async getItemExchange(exchange_item_id: number, qr?: QueryRunner) {
    const itemExchangeRepository = this.getItemExchangeRepository(qr);
    const result = await itemExchangeRepository.findOne({
      where: {
        exchange_item_id,
      },
    });
    return result;
  }
}
