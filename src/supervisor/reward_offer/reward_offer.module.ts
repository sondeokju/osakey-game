import { Module } from '@nestjs/common';
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
import { UserSnsRewardService } from 'src/inventory/sns/user_sns_reward/user_sns_reward.service';
import { UserSnsReward } from 'src/inventory/sns/user_sns_reward/entities/user_sns_reward.entity';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reward,
      Item,
      UserItem,
      Users,
      Hero,
      UserSnsReward,
      SnsReward,
    ]),
  ],
  exports: [RewardOfferService],
  controllers: [RewardInvenController],
  providers: [
    RewardOfferService,
    RewardService,
    ItemService,
    UserItemService,
    UsersService,
    HeroService,
    UserSnsRewardService,
    SnsRewardService,
  ],
})
export class RewardOfferModule {}
