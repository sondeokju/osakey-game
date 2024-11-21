import { Injectable } from '@nestjs/common';
import { CreateUserTunaTvDto } from './dto/create-user_tuna_tv.dto';
import { UpdateUserTunaTvDto } from './dto/update-user_tuna_tv.dto';

@Injectable()
export class UserTunaTvService {
  create(createUserTunaTvDto: CreateUserTunaTvDto) {
    return 'This action adds a new userTunaTv';
  }

  findAll() {
    return `This action returns all userTunaTv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTunaTv`;
  }

  update(id: number, updateUserTunaTvDto: UpdateUserTunaTvDto) {
    return `This action updates a #${id} userTunaTv`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTunaTv`;
  }
}
