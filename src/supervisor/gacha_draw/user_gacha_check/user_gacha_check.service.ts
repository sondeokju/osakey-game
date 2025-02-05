import { Injectable } from '@nestjs/common';
import { CreateUserGachaCheckDto } from './dto/create-user_gacha_check.dto';
import { UpdateUserGachaCheckDto } from './dto/update-user_gacha_check.dto';

@Injectable()
export class UserGachaCheckService {
  create(createUserGachaCheckDto: CreateUserGachaCheckDto) {
    return 'This action adds a new userGachaCheck';
  }

  findAll() {
    return `This action returns all userGachaCheck`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGachaCheck`;
  }

  update(id: number, updateUserGachaCheckDto: UpdateUserGachaCheckDto) {
    return `This action updates a #${id} userGachaCheck`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGachaCheck`;
  }
}
