import { Module } from '@nestjs/common';
import { UserSnsLevelService } from './user_sns_level.service';
import { UserSnsLevelController } from './user_sns_level.controller';
import { SnsLevel } from 'src/static-table/sns/sns_level/entities/sns_level.entity';
import { SnsReward } from 'src/static-table/sns/sns_reward/entities/sns_reward.entity';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';
import { UserSnsLevel } from './entities/user_sns_level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';
import { UserTunaTv } from '../user_tuna_tv/entities/user_tuna_tv.entity';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
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
import { SnsConfig } from 'src/static-table/sns/sns_config/entities/sns_config.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { UserSnsLikes } from '../user_sns_likes/entities/user_sns_likes.entity';
import { UserSnsLikesService } from '../user_sns_likes/user_sns_likes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSnsLevel,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
      UserTunaTv,
      SnsLevel,
      SnsReward,
      SnsConfig,
      UserSnsLikes,
    ]),
  ],
  exports: [UserSnsLevelService],
  controllers: [UserSnsLevelController],
  providers: [
    UserSnsLevelService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
    UserTunaTvService,
    SnsLevelService,
    SnsRewardService,
    SnsConfigService,
    UserSnsLikesService,
  ],
})
export class UserSnsLevelModule {}
