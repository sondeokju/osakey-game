import { Injectable } from '@nestjs/common';
import { CreateUserDispatchDto } from './dto/create-user_dispatch.dto';
import { UpdateUserDispatchDto } from './dto/update-user_dispatch.dto';

@Injectable()
export class UserDispatchService {
  create(createUserDispatchDto: CreateUserDispatchDto) {
    return 'This action adds a new userDispatch';
  }

  findAll() {
    return `This action returns all userDispatch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDispatch`;
  }

  update(id: number, updateUserDispatchDto: UpdateUserDispatchDto) {
    return `This action updates a #${id} userDispatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDispatch`;
  }
}
