import { Injectable } from '@nestjs/common';
import { CreateUserMemoryShareDto } from './dto/create-user_memory_share.dto';
import { UpdateUserMemoryShareDto } from './dto/update-user_memory_share.dto';

@Injectable()
export class UserMemoryShareService {
  create(createUserMemoryShareDto: CreateUserMemoryShareDto) {
    return 'This action adds a new userMemoryShare';
  }

  findAll() {
    return `This action returns all userMemoryShare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMemoryShare`;
  }

  update(id: number, updateUserMemoryShareDto: UpdateUserMemoryShareDto) {
    return `This action updates a #${id} userMemoryShare`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMemoryShare`;
  }
}
