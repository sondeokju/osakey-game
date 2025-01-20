import { Module } from '@nestjs/common';
import { UserNpcFriendshipService } from './user_npc_friendship.service';
import { UserNpcFriendshipController } from './user_npc_friendship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNpcFriendship } from './entities/user_npc_friendship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserNpcFriendship])],
  exports: [UserNpcFriendshipService],
  controllers: [UserNpcFriendshipController],
  providers: [UserNpcFriendshipService],
})
export class UserNpcFriendshipModule {}
