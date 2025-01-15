import { Injectable } from '@nestjs/common';
import { CreateUserOfflineRewardDto } from './dto/create-user_offline_reward.dto';
import { UpdateUserOfflineRewardDto } from './dto/update-user_offline_reward.dto';

@Injectable()
export class UserOfflineRewardService {
  create(createUserOfflineRewardDto: CreateUserOfflineRewardDto) {
    return 'This action adds a new userOfflineReward';
  }

  findAll() {
    return `This action returns all userOfflineReward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userOfflineReward`;
  }

  update(id: number, updateUserOfflineRewardDto: UpdateUserOfflineRewardDto) {
    return `This action updates a #${id} userOfflineReward`;
  }

  remove(id: number) {
    return `This action removes a #${id} userOfflineReward`;
  }
}
