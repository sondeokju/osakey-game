import { forwardRef, Module } from '@nestjs/common';
import { RewardOfferService } from './reward_offer.service';
import { RewardInvenController } from './reward_offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
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

// console.log('RewardOfferModule imports:', {
//   RewardModule,
//   ItemModule,
//   UserItemModule,
//   UsersModule,
//   HeroModule,
//   UserEquipModule,
//   EquipService,
// });

@Module({
  imports: [TypeOrmModule.forFeature([Reward, Item, UserItem, Users, Hero])],
  exports: [RewardOfferService],
  controllers: [RewardInvenController],
  providers: [
    RewardOfferService,
    RewardService,
    ItemService,
    UserItemService,
    UsersService,
    HeroService,
  ],
})
export class RewardOfferModule {}
