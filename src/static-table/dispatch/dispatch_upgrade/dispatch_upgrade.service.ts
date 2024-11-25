import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DispatchUpgrade } from './entities/dispatch_upgrade.entity';

@Injectable()
export class DispatchUpgradeService {
  constructor(
    @InjectRepository(DispatchUpgrade)
    private readonly dispatchUpgradeRepository: Repository<DispatchUpgrade>,
  ) {}

  getDispatchUpgradeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<DispatchUpgrade>(DispatchUpgrade)
      : this.dispatchUpgradeRepository;
  }

  async getDispatchUpgradeAll(qr?: QueryRunner) {
    const dispatchUpgradeRepository = this.getDispatchUpgradeRepository(qr);
    const result = await dispatchUpgradeRepository.find({});
    return result;
  }

  async getDispatchUpgrade(suit_piece_grade: string, qr?: QueryRunner) {
    const dispatchUpgradeRepository = this.getDispatchUpgradeRepository(qr);
    const result = await dispatchUpgradeRepository.findOne({
      where: {
        suit_piece_grade,
      },
    });

    return result;
  }
}
