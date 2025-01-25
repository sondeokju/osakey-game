import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { RunStage } from './entities/run_stage.entity';

@Injectable()
export class RunStageService {
  constructor(
    @InjectRepository(RunStage)
    private readonly runStageRepository: Repository<RunStage>,
  ) {}

  getRunStageRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<RunStage>(RunStage)
      : this.runStageRepository;
  }

  async getRunStageAll(qr?: QueryRunner) {
    const runStageRepository = this.getRunStageRepository(qr);
    const result = await runStageRepository.find({});
    return result;
  }

  async getRunStage(run_stage_id: number, qr?: QueryRunner) {
    const runStageRepository = this.getRunStageRepository(qr);
    const result = await runStageRepository.findOne({
      where: {
        run_stage_id,
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
