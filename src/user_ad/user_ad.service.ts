import { Injectable } from '@nestjs/common';
import { CreateUserAdDto } from './dto/create-user_ad.dto';
import { UpdateUserAdDto } from './dto/update-user_ad.dto';

@Injectable()
export class UserAdService {
  create(createUserAdDto: CreateUserAdDto) {
    return 'This action adds a new userAd';
  }

  findAll() {
    return `This action returns all userAd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAd`;
  }

  update(id: number, updateUserAdDto: UpdateUserAdDto) {
    return `This action updates a #${id} userAd`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAd`;
  }
}
