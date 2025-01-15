import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCollection } from './entities/user_collection.entity';
import { UserCollectionController } from './user_collection.controller';
import { UserCollectionService } from './user_collection.service';
import { CollectionBossService } from 'src/static-table/collection/collection_boss/collection_boss.service';
import { CollectionEquipService } from 'src/static-table/collection/collection_equip/collection_equip.service';
import { CollectionNpcService } from 'src/static-table/collection/collection_npc/collection_npc.service';
import { CollectionSuitService } from 'src/static-table/collection/collection_suit/collection_suit.service';
import { CollectionBoss } from 'src/static-table/collection/collection_boss/entities/collection_boss.entity';
import { CollectionEquip } from 'src/static-table/collection/collection_equip/entities/collection_equip.entity';
import { CollectionNpc } from 'src/static-table/collection/collection_npc/entities/collection_npc.entity';
import { CollectionSuit } from 'src/static-table/collection/collection_suit/entities/collection_suit.entity';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserCollection,
      CollectionBoss,
      CollectionEquip,
      CollectionNpc,
      CollectionSuit,
      Reward,
      Users,
      Item,
      UserItem,
      Hero,
    ]),
  ],
  exports: [UserCollectionService],
  controllers: [UserCollectionController],
  providers: [
    UserCollectionService,
    CollectionBossService,
    CollectionEquipService,
    CollectionNpcService,
    CollectionSuitService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
  ],
})
export class UserCollectionModule {}
