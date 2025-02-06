import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { BountyStage } from './entities/bounty_stage.entity';

@Injectable()
export class BountyStageService {
  constructor(
    @InjectRepository(BountyStage)
    private readonly bountyStageRepository: Repository<BountyStage>,
  ) {}

  getBountyStageRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<BountyStage>(BountyStage)
      : this.bountyStageRepository;
  }

  async getBountyStageAll(qr?: QueryRunner) {
    const bountyStageRepository = this.getBountyStageRepository(qr);
    const result = await bountyStageRepository.find({});
    return result;
  }

  async getBountyStage(bounty_stage_id: number, qr?: QueryRunner) {
    const bountyStageRepository = this.getBountyStageRepository(qr);
    const result = await bountyStageRepository.findOne({
      where: {
        bounty_stage_id,
      },
    });

    return result;
  }
}
