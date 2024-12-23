import { Module } from '@nestjs/common';
import { ResourceManagerService } from './resource_manager';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';

@Module({
  providers: [ResourceManagerService, UsersService, UserItemService],
  exports: [ResourceManagerService],
})
export class ResourceManagerModule {}
