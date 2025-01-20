import { Injectable } from '@nestjs/common';
import { CreateUserMembershipDto } from './dto/create-user_membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user_membership.dto';

@Injectable()
export class UserMembershipService {
  create(createUserMembershipDto: CreateUserMembershipDto) {
    return 'This action adds a new userMembership';
  }

  findAll() {
    return `This action returns all userMembership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMembership`;
  }

  update(id: number, updateUserMembershipDto: UpdateUserMembershipDto) {
    return `This action updates a #${id} userMembership`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMembership`;
  }
}
