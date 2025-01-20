import { Module } from '@nestjs/common';
import { UserMembershipService } from './user_membership.service';
import { UserMembershipController } from './user_membership.controller';

@Module({
  controllers: [UserMembershipController],
  providers: [UserMembershipService],
})
export class UserMembershipModule {}
