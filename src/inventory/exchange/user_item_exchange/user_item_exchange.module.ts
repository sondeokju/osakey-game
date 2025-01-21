import { Module } from '@nestjs/common';
import { UserItemExchangeService } from './user_item_exchange.service';
import { UserItemExchangeController } from './user_item_exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserItemExchange } from './entities/user_item_exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserItemExchange])],
  exports: [UserItemExchangeService],
  controllers: [UserItemExchangeController],
  providers: [UserItemExchangeService],
})
export class UserItemExchangeModule {}
