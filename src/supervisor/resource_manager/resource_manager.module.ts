import { Module } from '@nestjs/common';
import { ResourceManagerService } from './resource_manager.service';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [ResourceManagerService, UsersService, UserItemService],
  exports: [ResourceManagerService],
})
export class ResourceManagerModule {}
