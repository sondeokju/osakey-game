import { Module } from '@nestjs/common';
import { UserOfflineRewardService } from './user_offline_reward.service';
import { UserOfflineRewardController } from './user_offline_reward.controller';
import { UserOfflineReward } from './entities/user_offline_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOfflineReward,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
    ]),
  ],
  exports: [UserOfflineRewardService],
  controllers: [UserOfflineRewardController],
  providers: [
    UserOfflineRewardService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
  ],
})
export class UserOfflineRewardModule {}
