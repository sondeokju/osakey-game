import { Injectable } from '@nestjs/common';
import { CreateUserSecameMailDto } from './dto/create-user_secame_mail.dto';
import { UpdateUserSecameMailDto } from './dto/update-user_secame_mail.dto';

@Injectable()
export class UserSecameMailService {
  create(createUserSecameMailDto: CreateUserSecameMailDto) {
    return 'This action adds a new userSecameMail';
  }

  findAll() {
    return `This action returns all userSecameMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSecameMail`;
  }

  update(id: number, updateUserSecameMailDto: UpdateUserSecameMailDto) {
    return `This action updates a #${id} userSecameMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSecameMail`;
  }
}
