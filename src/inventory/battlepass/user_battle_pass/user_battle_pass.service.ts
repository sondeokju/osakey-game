import { Injectable } from '@nestjs/common';
import { CreateUserBattlePassDto } from './dto/create-user_battle_pass.dto';
import { UpdateUserBattlePassDto } from './dto/update-user_battle_pass.dto';

@Injectable()
export class UserBattlePassService {
  create(createUserBattlePassDto: CreateUserBattlePassDto) {
    return 'This action adds a new userBattlePass';
  }

  findAll() {
    return `This action returns all userBattlePass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBattlePass`;
  }

  update(id: number, updateUserBattlePassDto: UpdateUserBattlePassDto) {
    return `This action updates a #${id} userBattlePass`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBattlePass`;
  }
}
