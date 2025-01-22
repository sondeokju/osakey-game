import { Module } from '@nestjs/common';
import { ResourceManagerService } from './resource_manager.service';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { UserItemModule } from 'src/user_item/user_item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), HeroModule, UserItemModule],
  providers: [ResourceManagerService, UsersService, UserItemService],
  exports: [ResourceManagerService],
})
export class ResourceManagerModule {}
