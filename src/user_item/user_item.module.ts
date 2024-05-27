import { Module } from '@nestjs/common';
import { UserItemService } from './user_item.service';
import { UserItemController } from './user_item.controller';
import { UserItem } from './entities/user_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserItem, Item])],
  exports: [UserItemService],
  controllers: [UserItemController],
  providers: [UserItemService, ItemService],
})
export class UserItemModule {}
