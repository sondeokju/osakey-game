import { Module } from '@nestjs/common';
import { ItemExchangeService } from './item_exchange.service';
import { ItemExchangeController } from './item_exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemExchange } from './entities/item_exchange.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { RewardModule } from 'src/static-table/reward/reward.module';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemExchange])],
  exports: [ItemExchangeService],
  controllers: [ItemExchangeController],
  providers: [ItemExchangeService],
})
export class ItemExchangeModule {}
