import { Injectable } from '@nestjs/common';
import { CreateRewardGroupDto } from './dto/create-reward_group.dto';
import { UpdateRewardGroupDto } from './dto/update-reward_group.dto';

@Injectable()
export class RewardGroupService {
  create(createRewardGroupDto: CreateRewardGroupDto) {
    return 'This action adds a new rewardGroup';
  }

  findAll() {
    return `This action returns all rewardGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rewardGroup`;
  }

  update(id: number, updateRewardGroupDto: UpdateRewardGroupDto) {
    return `This action updates a #${id} rewardGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} rewardGroup`;
  }
}
