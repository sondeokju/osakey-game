import { Injectable } from '@nestjs/common';
import { CreateAccountLevelDto } from './dto/create-account_level.dto';
import { UpdateAccountLevelDto } from './dto/update-account_level.dto';

@Injectable()
export class AccountLevelService {
  create(createAccountLevelDto: CreateAccountLevelDto) {
    return 'This action adds a new accountLevel';
  }

  findAll() {
    return `This action returns all accountLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountLevel`;
  }

  update(id: number, updateAccountLevelDto: UpdateAccountLevelDto) {
    return `This action updates a #${id} accountLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountLevel`;
  }
}
