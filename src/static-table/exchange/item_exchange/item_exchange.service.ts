import { Injectable } from '@nestjs/common';
import { CreateItemExchangeDto } from './dto/create-item_exchange.dto';
import { UpdateItemExchangeDto } from './dto/update-item_exchange.dto';

@Injectable()
export class ItemExchangeService {
  create(createItemExchangeDto: CreateItemExchangeDto) {
    return 'This action adds a new itemExchange';
  }

  findAll() {
    return `This action returns all itemExchange`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemExchange`;
  }

  update(id: number, updateItemExchangeDto: UpdateItemExchangeDto) {
    return `This action updates a #${id} itemExchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemExchange`;
  }
}
