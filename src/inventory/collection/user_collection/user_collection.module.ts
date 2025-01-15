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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserCollection,
      CollectionBoss,
      CollectionEquip,
      CollectionNpc,
      CollectionSuit,
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
  ],
})
export class UserCollectionModule {}
