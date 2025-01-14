import { Injectable } from '@nestjs/common';
import { CreateUserMailDto } from './dto/create-user_mail.dto';
import { UpdateUserMailDto } from './dto/update-user_mail.dto';

@Injectable()
export class UserMailService {
  create(createUserMailDto: CreateUserMailDto) {
    return 'This action adds a new userMail';
  }

  findAll() {
    return `This action returns all userMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMail`;
  }

  update(id: number, updateUserMailDto: UpdateUserMailDto) {
    return `This action updates a #${id} userMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMail`;
  }
}
