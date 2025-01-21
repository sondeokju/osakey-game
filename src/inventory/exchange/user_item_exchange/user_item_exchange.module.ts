import { Module } from '@nestjs/common';
import { UserItemExchangeService } from './user_item_exchange.service';
import { UserItemExchangeController } from './user_item_exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserItemExchange } from './entities/user_item_exchange.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { ItemExchangeModule } from 'src/static-table/exchange/item_exchange/item_exchange.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserItemExchange]),
    RewardOfferModule,
    ItemExchangeModule,
  ],
  exports: [UserItemExchangeService],
  controllers: [UserItemExchangeController],
  providers: [UserItemExchangeService],
})
export class UserItemExchangeModule {}
