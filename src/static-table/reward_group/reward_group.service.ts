import { Injectable } from '@nestjs/common';
import { CreateRewardGroupDto } from './dto/create-reward_group.dto';
import { UpdateRewardGroupDto } from './dto/update-reward_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RewardGroup } from './entities/reward_group.entity';

@Injectable()
export class RewardGroupService {
  constructor(
    @InjectRepository(RewardGroup)
    private readonly rewardGroupRepository: Repository<RewardGroup>,
  ) {}

  async getReward(reward: number) {
    // const result = await this.rewardGroupRepository.findOne({
    //   where: {
    //     reward,
    //   },
    // });

    return 0;
  }

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
