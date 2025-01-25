import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SuitLevel } from './entities/suit_level.entity';

@Injectable()
export class SuitLevelService {
  constructor(
    @InjectRepository(SuitLevel)
    private readonly suitLevelRepository: Repository<SuitLevel>,
  ) {}

  getSuitLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SuitLevel>(SuitLevel)
      : this.suitLevelRepository;
  }

  async getSuitLevelAll(qr?: QueryRunner) {
    const suitLevelRepository = this.getSuitLevelRepository(qr);
    const result = await suitLevelRepository.find({});
    return result;
  }

  async getSuitLevel(suit_level_id: number, qr?: QueryRunner) {
    const suitLevelRepository = this.getSuitLevelRepository(qr);
    const result = await suitLevelRepository.findOne({
      where: {
        suit_level_id,
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
