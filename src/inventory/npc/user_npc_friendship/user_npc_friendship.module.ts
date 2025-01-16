import { Module } from '@nestjs/common';
import { UserNpcFriendshipService } from './user_npc_friendship.service';
import { UserNpcFriendshipController } from './user_npc_friendship.controller';

@Module({
  controllers: [UserNpcFriendshipController],
  providers: [UserNpcFriendshipService],
})
export class UserNpcFriendshipModule {}
