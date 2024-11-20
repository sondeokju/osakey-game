import { Injectable } from '@nestjs/common';
import { CreateSnsRewardDto } from './dto/create-sns_reward.dto';
import { UpdateSnsRewardDto } from './dto/update-sns_reward.dto';

@Injectable()
export class SnsRewardService {
  create(createSnsRewardDto: CreateSnsRewardDto) {
    return 'This action adds a new snsReward';
  }

  findAll() {
    return `This action returns all snsReward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snsReward`;
  }

  update(id: number, updateSnsRewardDto: UpdateSnsRewardDto) {
    return `This action updates a #${id} snsReward`;
  }

  remove(id: number) {
    return `This action removes a #${id} snsReward`;
  }
}
