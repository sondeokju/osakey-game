import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SuitUltimateLevel } from './entities/suit_ultimate_level.entity';

@Injectable()
export class SuitUltimateLevelService {
  constructor(
    @InjectRepository(SuitUltimateLevel)
    private readonly suitUltimateLevelRepository: Repository<SuitUltimateLevel>,
  ) {}

  getSuitUltimateLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SuitUltimateLevel>(SuitUltimateLevel)
      : this.suitUltimateLevelRepository;
  }

  async getSuitUltimateLevelAll(qr?: QueryRunner) {
    const suitUltimateLevelRepository = this.getSuitUltimateLevelRepository(qr);
    const result = await suitUltimateLevelRepository.find({});
    return result;
  }

  async getSuitUltimateLevel(suit_ultimate_level_id: number, qr?: QueryRunner) {
    const runStageRepository = this.getSuitUltimateLevelRepository(qr);
    const result = await runStageRepository.findOne({
      where: {
        suit_ultimate_level_id,
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
