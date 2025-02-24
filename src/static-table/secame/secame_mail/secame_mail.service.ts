import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SecameMail } from './entities/secame_mail.entity';

@Injectable()
export class SecameMailService {
  constructor(
    @InjectRepository(SecameMail)
    private readonly secameMailRepository: Repository<SecameMail>,
  ) {}

  getSecameMailRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SecameMail>(SecameMail)
      : this.secameMailRepository;
  }

  async getSecameMailAll(qr?: QueryRunner) {
    const secameMailRepository = this.getSecameMailRepository(qr);
    const result = await secameMailRepository.find({});
    return result;
  }

  async getSecameMail(secame_mail_id: number, qr?: QueryRunner) {
    const secameMailRepository = this.getSecameMailRepository(qr);
    const result = await secameMailRepository.findOne({
      where: {
        secame_mail_id,
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
