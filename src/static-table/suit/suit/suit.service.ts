import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Suit } from './entities/suit.entity';

@Injectable()
export class SuitService {
  constructor(
    @InjectRepository(Suit)
    private readonly suitRepository: Repository<Suit>,
  ) {}

  getSuitRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Suit>(Suit) : this.suitRepository;
  }

  async getSuitAll(qr?: QueryRunner) {
    const suitRepository = this.getSuitRepository(qr);
    const result = await suitRepository.find({});
    return result;
  }

  async getSuit(suit_id: number, qr?: QueryRunner) {
    const suitRepository = this.getSuitRepository(qr);
    const result = await suitRepository.findOne({
      where: {
        suit_id,
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
