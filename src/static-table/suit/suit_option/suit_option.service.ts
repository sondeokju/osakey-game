import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SuitOption } from './entities/suit_option.entity';

@Injectable()
export class SuitOptionService {
  constructor(
    @InjectRepository(SuitOption)
    private readonly suitOptionRepository: Repository<SuitOption>,
  ) {}

  getSuitOptionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SuitOption>(SuitOption)
      : this.suitOptionRepository;
  }

  async getSuitOptionAll(qr?: QueryRunner) {
    const suitOptionRepository = this.getSuitOptionRepository(qr);
    const result = await suitOptionRepository.find({});
    return result;
  }

  async getSuitOption(id: number, qr?: QueryRunner) {
    const suitOptionRepository = this.getSuitOptionRepository(qr);
    const result = await suitOptionRepository.findOne({
      where: {
        id,
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
