import { Injectable } from '@nestjs/common';
import { CreateUserMemorizeDto } from './dto/create-user_memorize.dto';
import { UpdateUserMemorizeDto } from './dto/update-user_memorize.dto';

@Injectable()
export class UserMemorizeService {
  create(createUserMemorizeDto: CreateUserMemorizeDto) {
    return 'This action adds a new userMemorize';
  }

  findAll() {
    return `This action returns all userMemorize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMemorize`;
  }

  update(id: number, updateUserMemorizeDto: UpdateUserMemorizeDto) {
    return `This action updates a #${id} userMemorize`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMemorize`;
  }
}
