import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { PuzzleStage } from './entities/puzzle_stage.entity';

@Injectable()
export class PuzzleStageService {
  constructor(
    @InjectRepository(PuzzleStage)
    private readonly puzzleStageRepository: Repository<PuzzleStage>,
  ) {}

  getPuzzleStageRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<PuzzleStage>(PuzzleStage)
      : this.puzzleStageRepository;
  }

  async getPuzzleStageAll(qr?: QueryRunner) {
    const puzzleStageRepository = this.getPuzzleStageRepository(qr);
    const result = await puzzleStageRepository.find({});
    return result;
  }

  async getPuzzleStage(puzzle_stage_id: number, qr?: QueryRunner) {
    const puzzleStageRepository = this.getPuzzleStageRepository(qr);
    const result = await puzzleStageRepository.findOne({
      where: {
        puzzle_stage_id,
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
