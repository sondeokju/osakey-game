import { Injectable } from '@nestjs/common';
import { CreateUserIngameRewardDto } from './dto/create-user_ingame_reward.dto';
import { UpdateUserIngameRewardDto } from './dto/update-user_ingame_reward.dto';

@Injectable()
export class UserIngameRewardService {
  create(createUserIngameRewardDto: CreateUserIngameRewardDto) {
    return 'This action adds a new userIngameReward';
  }

  findAll() {
    return `This action returns all userIngameReward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userIngameReward`;
  }

  update(id: number, updateUserIngameRewardDto: UpdateUserIngameRewardDto) {
    return `This action updates a #${id} userIngameReward`;
  }

  remove(id: number) {
    return `This action removes a #${id} userIngameReward`;
  }
}
