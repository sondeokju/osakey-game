import { Module } from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';
import { UserSnsRewardController } from './user_sns_reward.controller';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { UserSnsReward } from './entities/user_sns_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entity/users.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSnsReward,
      SnsReward,
      Reward,
      Users,
      Item,
      UserItem,
    ]),
  ],
  exports: [UserSnsRewardService],
  controllers: [UserSnsRewardController],
  providers: [
    UserSnsRewardService,
    SnsRewardService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
  ],
})
export class UserSnsRewardModule {}
