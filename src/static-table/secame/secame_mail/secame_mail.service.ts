import { Injectable } from '@nestjs/common';
import { CreateSecameMailDto } from './dto/create-secame_mail.dto';
import { UpdateSecameMailDto } from './dto/update-secame_mail.dto';

@Injectable()
export class SecameMailService {
  create(createSecameMailDto: CreateSecameMailDto) {
    return 'This action adds a new secameMail';
  }

  findAll() {
    return `This action returns all secameMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secameMail`;
  }

  update(id: number, updateSecameMailDto: UpdateSecameMailDto) {
    return `This action updates a #${id} secameMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} secameMail`;
  }
}
