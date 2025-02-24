import { Injectable } from '@nestjs/common';
import { CreateDispatchRewardDto } from './dto/create-dispatch_reward.dto';
import { UpdateDispatchRewardDto } from './dto/update-dispatch_reward.dto';

@Injectable()
export class DispatchRewardService {
  create(createDispatchRewardDto: CreateDispatchRewardDto) {
    return 'This action adds a new dispatchReward';
  }

  findAll() {
    return `This action returns all dispatchReward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatchReward`;
  }

  update(id: number, updateDispatchRewardDto: UpdateDispatchRewardDto) {
    return `This action updates a #${id} dispatchReward`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatchReward`;
  }
}
