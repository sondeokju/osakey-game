import { Injectable } from '@nestjs/common';
import { CreateUserSnsLevelDto } from './dto/create-user_sns_level.dto';
import { UpdateUserSnsLevelDto } from './dto/update-user_sns_level.dto';

@Injectable()
export class UserSnsLevelService {
  create(createUserSnsLevelDto: CreateUserSnsLevelDto) {
    return 'This action adds a new userSnsLevel';
  }

  findAll() {
    return `This action returns all userSnsLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSnsLevel`;
  }

  update(id: number, updateUserSnsLevelDto: UpdateUserSnsLevelDto) {
    return `This action updates a #${id} userSnsLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSnsLevel`;
  }
}
