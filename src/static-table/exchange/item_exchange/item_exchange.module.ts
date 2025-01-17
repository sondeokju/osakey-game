import { Module } from '@nestjs/common';
import { ItemExchangeService } from './item_exchange.service';
import { ItemExchangeController } from './item_exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemExchange } from './entities/item_exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemExchange])],
  exports: [ItemExchangeService],
  controllers: [ItemExchangeController],
  providers: [ItemExchangeService],
})
export class ItemExchangeModule {}
