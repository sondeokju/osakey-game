import { Module } from '@nestjs/common';
import { UserMembershipService } from './user_membership.service';
import { UserMembershipController } from './user_membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMembership } from './entities/user_membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMembership])],
  exports: [UserMembershipService],
  controllers: [UserMembershipController],
  providers: [UserMembershipService],
})
export class UserMembershipModule {}
