import { Injectable } from '@nestjs/common';
import { CreateUserBattleDto } from './dto/create-user_battle.dto';
import { UpdateUserBattleDto } from './dto/update-user_battle.dto';

@Injectable()
export class UserBattleService {
  create(createUserBattleDto: CreateUserBattleDto) {
    return 'This action adds a new userBattle';
  }

  findAll() {
    return `This action returns all userBattle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBattle`;
  }

  update(id: number, updateUserBattleDto: UpdateUserBattleDto) {
    return `This action updates a #${id} userBattle`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBattle`;
  }
}
