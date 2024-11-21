import { Module } from '@nestjs/common';
import { UserFollowService } from './user_follow.service';
import { UserFollowController } from './user_follow.controller';

@Module({
  controllers: [UserFollowController],
  providers: [UserFollowService],
})
export class UserFollowModule {}
