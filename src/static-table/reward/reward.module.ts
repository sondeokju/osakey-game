import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { ItemService } from '../item/item.service';
import { Item } from '../item/entities/item.entity';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Hero } from '../hero/entities/hero.entity';
import { HeroService } from '../hero/hero.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, Item, UserItem, Users, Hero])],
  exports: [RewardService],
  controllers: [RewardController],
  providers: [
    RewardService,
    ItemService,
    UserItemService,
    UsersService,
    HeroService,
  ],
})
export class RewardModule {}
