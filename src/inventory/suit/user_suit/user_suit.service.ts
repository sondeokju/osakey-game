import { Injectable } from '@nestjs/common';
import { CreateUserSuitDto } from './dto/create-user_suit.dto';
import { UpdateUserSuitDto } from './dto/update-user_suit.dto';

@Injectable()
export class UserSuitService {
  create(createUserSuitDto: CreateUserSuitDto) {
    return 'This action adds a new userSuit';
  }

  findAll() {
    return `This action returns all userSuit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSuit`;
  }

  update(id: number, updateUserSuitDto: UpdateUserSuitDto) {
    return `This action updates a #${id} userSuit`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSuit`;
  }
}
