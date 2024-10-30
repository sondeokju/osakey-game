import { Module } from '@nestjs/common';
import { RewardInvenService } from './reward_inven.service';
import { RewardInvenController } from './reward_inven.controller';
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

@Module({
  imports: [TypeOrmModule.forFeature([Reward, Item, UserItem, Users, Hero])],
  exports: [RewardInvenService],
  controllers: [RewardInvenController],
  providers: [
    RewardInvenService,
    RewardService,
    ItemService,
    UserItemService,
    UsersService,
    HeroService,
  ],
})
export class RewardInvenModule {}
