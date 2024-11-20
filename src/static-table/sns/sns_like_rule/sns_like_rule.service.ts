import { Injectable } from '@nestjs/common';
import { CreateSnsLikeRuleDto } from './dto/create-sns_like_rule.dto';
import { UpdateSnsLikeRuleDto } from './dto/update-sns_like_rule.dto';

@Injectable()
export class SnsLikeRuleService {
  create(createSnsLikeRuleDto: CreateSnsLikeRuleDto) {
    return 'This action adds a new snsLikeRule';
  }

  findAll() {
    return `This action returns all snsLikeRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snsLikeRule`;
  }

  update(id: number, updateSnsLikeRuleDto: UpdateSnsLikeRuleDto) {
    return `This action updates a #${id} snsLikeRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} snsLikeRule`;
  }
}
