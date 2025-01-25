import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SuitUltimate } from './entities/suit_ultimate.entity';

@Injectable()
export class SuitUltimateService {
  constructor(
    @InjectRepository(SuitUltimate)
    private readonly suitUltimateRepository: Repository<SuitUltimate>,
  ) {}

  getSuitUltimateRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SuitUltimate>(SuitUltimate)
      : this.suitUltimateRepository;
  }

  async getSuitUltimateAll(qr?: QueryRunner) {
    const suitUltimateRepository = this.getSuitUltimateRepository(qr);
    const result = await suitUltimateRepository.find({});
    return result;
  }

  async getSuitUltimate(suit_ultimate_id: number, qr?: QueryRunner) {
    const runStageRepository = this.getSuitUltimateRepository(qr);
    const result = await runStageRepository.findOne({
      where: {
        suit_ultimate_id,
      },
    });

    return result;
  }

  // async getbattleStage(board_num: number, day: number, qr?: QueryRunner) {
  //   const attendanceRepository = this.getAttendanceRepository(qr);
  //   const result = await attendanceRepository.findOne({
  //     where: {
  //       board_num,
  //       day,
  //     },
  //   });

  //   return result;
  // }
}
