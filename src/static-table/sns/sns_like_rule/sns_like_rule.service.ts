import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLikeRule } from './entities/sns_like_rule.entity';

@Injectable()
export class SnsLikeRuleService {
  constructor(
    @InjectRepository(SnsLikeRule)
    private readonly snsLikeRuleRepository: Repository<SnsLikeRule>,
  ) {}

  getLikeRuleRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SnsLikeRule>(SnsLikeRule)
      : this.snsLikeRuleRepository;
  }

  async getSnsLikeRuleAll(qr?: QueryRunner) {
    const snsLikeRuleRepository = this.getLikeRuleRepository(qr);
    const result = await snsLikeRuleRepository.find({});
    return result;
  }

  async getSnsLikeRule(sns_level: number, qr?: QueryRunner) {
    const snsLikeRuleRepository = this.getLikeRuleRepository(qr);
    const result = await snsLikeRuleRepository.findOne({
      where: {
        sns_level,
      },
    });

    return result;
  }
}
