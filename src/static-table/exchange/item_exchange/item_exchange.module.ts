import { Module } from '@nestjs/common';
import { ItemExchangeService } from './item_exchange.service';
import { ItemExchangeController } from './item_exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemExchange } from './entities/item_exchange.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemExchange]), RewardOfferModule],
  exports: [ItemExchangeService],
  controllers: [ItemExchangeController],
  providers: [ItemExchangeService],
})
export class ItemExchangeModule {}
