import { Injectable } from '@nestjs/common';
import { CreateUserBattlePassRewardDto } from './dto/create-user_battle_pass_reward.dto';
import { UpdateUserBattlePassRewardDto } from './dto/update-user_battle_pass_reward.dto';

@Injectable()
export class UserBattlePassRewardService {
  create(createUserBattlePassRewardDto: CreateUserBattlePassRewardDto) {
    return 'This action adds a new userBattlePassReward';
  }

  findAll() {
    return `This action returns all userBattlePassReward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBattlePassReward`;
  }

  update(id: number, updateUserBattlePassRewardDto: UpdateUserBattlePassRewardDto) {
    return `This action updates a #${id} userBattlePassReward`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBattlePassReward`;
  }
}
