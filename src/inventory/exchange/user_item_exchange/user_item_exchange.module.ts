import { Module } from '@nestjs/common';
import { UserItemExchangeService } from './user_item_exchange.service';
import { UserItemExchangeController } from './user_item_exchange.controller';

@Module({
  controllers: [UserItemExchangeController],
  providers: [UserItemExchangeService],
})
export class UserItemExchangeModule {}
