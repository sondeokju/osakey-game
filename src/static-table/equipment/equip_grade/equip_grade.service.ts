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

  async getEquipGrade(equip_grade_max: string, qr?: QueryRunner) {
    const equipGradeRepository = this.getEquipGradeRepository(qr);
    const result = await equipGradeRepository.findOne({
      where: {
        equip_grade_max,
      },
    });
    return result;
  }
}
