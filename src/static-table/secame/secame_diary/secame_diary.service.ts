import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SecameDiary } from './entities/secame_diary.entity';

@Injectable()
export class SecameDiaryService {
  constructor(
    @InjectRepository(SecameDiary)
    private readonly secameDiaryRepository: Repository<SecameDiary>,
  ) {}

  getSecameDiaryRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SecameDiary>(SecameDiary)
      : this.secameDiaryRepository;
  }

  async getSecameDiaryAll(qr?: QueryRunner) {
    const secameDiaryRepository = this.getSecameDiaryRepository(qr);
    const result = await secameDiaryRepository.find({});
    return result;
  }

  async getSecameDiary(secame_diary_id: number, qr?: QueryRunner) {
    const secameDiaryRepository = this.getSecameDiaryRepository(qr);
    const result = await secameDiaryRepository.findOne({
      where: {
        secame_diary_id,
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
