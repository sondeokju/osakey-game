import { Injectable } from '@nestjs/common';
import { CreateUserNpcFriendshipDto } from './dto/create-user_npc_friendship.dto';
import { UpdateUserNpcFriendshipDto } from './dto/update-user_npc_friendship.dto';

@Injectable()
export class UserNpcFriendshipService {
  create(createUserNpcFriendshipDto: CreateUserNpcFriendshipDto) {
    return 'This action adds a new userNpcFriendship';
  }

  findAll() {
    return `This action returns all userNpcFriendship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userNpcFriendship`;
  }

  update(id: number, updateUserNpcFriendshipDto: UpdateUserNpcFriendshipDto) {
    return `This action updates a #${id} userNpcFriendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} userNpcFriendship`;
  }
}
