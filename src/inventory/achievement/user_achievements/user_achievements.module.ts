import { Module } from '@nestjs/common';
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
import { UserAchievementsService } from './user_achievements.service';
import { UserAchievementsController } from './user_achievements.controller';
import { UserAchievements } from './entities/user_achievements.entity';
import { AchieveListService } from 'src/static-table/achieve/achieve_list/achieve_list.service';
import { AchieveList } from 'src/static-table/achieve/achieve_list/entities/achieve_list.entity';
import { UserAchieveRankingModule } from '../user_achieve_ranking/user_achieve_ranking.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAchievements,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
      AchieveList,
    ]),
    UserAchieveRankingModule,
    GameLogsModule,
  ],
  exports: [UserAchievementsService],
  controllers: [UserAchievementsController],
  providers: [
    UserAchievementsService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
    AchieveListService,
  ],
})
export class UserAchievementsModule {}
