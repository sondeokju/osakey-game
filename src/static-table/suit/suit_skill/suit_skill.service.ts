import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SuitSkill } from './entities/suit_skill.entity';

@Injectable()
export class SuitSkillService {
  constructor(
    @InjectRepository(SuitSkill)
    private readonly suitSkillRepository: Repository<SuitSkill>,
  ) {}

  getSuitSkillRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SuitSkill>(SuitSkill)
      : this.suitSkillRepository;
  }

  async getSuitSkillAll(qr?: QueryRunner) {
    const suitSkillRepository = this.getSuitSkillRepository(qr);
    const result = await suitSkillRepository.find({});
    return result;
  }

  async getSuitSkill(id: number, qr?: QueryRunner) {
    const suitSkillRepository = this.getSuitSkillRepository(qr);
    const result = await suitSkillRepository.findOne({
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
