import { Injectable } from '@nestjs/common';
import { CreateUserIngameLogDto } from './dto/create-user_ingame_log.dto';
import { UpdateUserIngameLogDto } from './dto/update-user_ingame_log.dto';

@Injectable()
export class UserIngameLogService {
  create(createUserIngameLogDto: CreateUserIngameLogDto) {
    return 'This action adds a new userIngameLog';
  }

  findAll() {
    return `This action returns all userIngameLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userIngameLog`;
  }

  update(id: number, updateUserIngameLogDto: UpdateUserIngameLogDto) {
    return `This action updates a #${id} userIngameLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userIngameLog`;
  }
}
