import { Module } from '@nestjs/common';
import { ResourceManagerService } from './resource_manager.service';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { UserItemModule } from 'src/user_item/user_item.module';
import { UserItem } from 'src/user_item/entities/user_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserItem]),
    HeroModule,
    UserItemModule,
  ],
  providers: [ResourceManagerService, UsersService, UserItemService],
  exports: [ResourceManagerService],
})
export class ResourceManagerModule {}
