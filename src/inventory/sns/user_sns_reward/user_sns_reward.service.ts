import { Injectable } from '@nestjs/common';
import { CreateUserSnsRewardDto } from './dto/create-user_sns_reward.dto';
import { UpdateUserSnsRewardDto } from './dto/update-user_sns_reward.dto';

@Injectable()
export class UserSnsRewardService {
  create(createUserSnsRewardDto: CreateUserSnsRewardDto) {
    return 'This action adds a new userSnsReward';
  }

  findAll() {
    return `This action returns all userSnsReward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSnsReward`;
  }

  update(id: number, updateUserSnsRewardDto: UpdateUserSnsRewardDto) {
    return `This action updates a #${id} userSnsReward`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSnsReward`;
  }
}
