import { forwardRef, Module } from '@nestjs/common';
import { RewardOfferService } from './reward_offer.service';
import { RewardInvenController } from './reward_offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { Item } from 'src/static-table/item/entities/item.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { ItemService } from 'src/static-table/item/item.service';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { RewardModule } from 'src/static-table/reward/reward.module';
import { ItemModule } from 'src/static-table/item/item.module';
import { UserItemModule } from 'src/user_item/user_item.module';
import { UsersModule } from 'src/users/users.module';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { UserEquipModule } from 'src/inventory/equipment/user_equip/user_equip.module';

console.log('RewardOfferModule imports:', {
  RewardModule,
  ItemModule,
  UserItemModule,
  UsersModule,
  HeroModule,
  UserEquipModule,
});

@Module({
  //imports: [TypeOrmModule.forFeature([Reward, Item, UserItem, Users, Hero])],
  imports: [
    RewardModule,
    ItemModule,
    UserItemModule,
    UsersModule,
    HeroModule,
    UserEquipModule,
  ],
  exports: [RewardOfferService],
  controllers: [RewardInvenController],
  providers: [
    RewardOfferService,
    //RewardService,
    //ItemService,
    //UserItemService,
    //UsersService,
    //HeroService,
  ],
})
export class RewardOfferModule {}
