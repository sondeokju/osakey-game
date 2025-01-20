import { Injectable } from '@nestjs/common';
import { CreateUserItemExchangeDto } from './dto/create-user_item_exchange.dto';
import { UpdateUserItemExchangeDto } from './dto/update-user_item_exchange.dto';

@Injectable()
export class UserItemExchangeService {
  create(createUserItemExchangeDto: CreateUserItemExchangeDto) {
    return 'This action adds a new userItemExchange';
  }

  findAll() {
    return `This action returns all userItemExchange`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userItemExchange`;
  }

  update(id: number, updateUserItemExchangeDto: UpdateUserItemExchangeDto) {
    return `This action updates a #${id} userItemExchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} userItemExchange`;
  }
}
