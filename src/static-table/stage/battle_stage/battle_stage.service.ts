import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { BattleStage } from './entities/battle_stage.entity';

@Injectable()
export class BattleStageService {
  constructor(
    @InjectRepository(BattleStage)
    private readonly battleStageRepository: Repository<BattleStage>,
  ) {}

  getBattleStageRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<BattleStage>(BattleStage)
      : this.battleStageRepository;
  }

  async getBattleStageAll(qr?: QueryRunner) {
    const battleStageRepository = this.getBattleStageRepository(qr);
    const result = await battleStageRepository.find({});
    return result;
  }

  async getBattleStage(battle_stage_id: number, qr?: QueryRunner) {
    const battleStageRepository = this.getBattleStageRepository(qr);
    const result = await battleStageRepository.findOne({
      where: {
        battle_stage_id,
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
