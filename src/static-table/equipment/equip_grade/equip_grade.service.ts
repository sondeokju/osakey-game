import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EquipGrade } from './entities/equip_grade.entity';

@Injectable()
export class EquipGradeService {
  constructor(
    @InjectRepository(EquipGrade)
    private readonly equipGradeRepository: Repository<EquipGrade>,
  ) {}

  getEquipGradeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EquipGrade>(EquipGrade)
      : this.equipGradeRepository;
  }

  async getEquipGradeAll(qr?: QueryRunner) {
    const equipGradeRepository = this.getEquipGradeRepository(qr);
    const result = await equipGradeRepository.find({});
    return result;
  }

  async getEquipGrade(id: number, qr?: QueryRunner) {
    // const eduRepository = this.getEduRepository(qr);
    // const result = await eduRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    // return result;
  }
}
