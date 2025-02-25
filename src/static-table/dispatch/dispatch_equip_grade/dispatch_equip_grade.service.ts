import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DispatchEquipGrade } from './entities/dispatch_equip_grade.entity';

@Injectable()
export class DispatchEquipGradeService {
  constructor(
    @InjectRepository(DispatchEquipGrade)
    private readonly dispatchEquipGradeRepository: Repository<DispatchEquipGrade>,
  ) {}

  getDispatchEquipGradeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<DispatchEquipGrade>(DispatchEquipGrade)
      : this.dispatchEquipGradeRepository;
  }

  async getDispatchEquipGradeAll(qr?: QueryRunner) {
    const dispatchEquipGradeRepository =
      this.getDispatchEquipGradeRepository(qr);
    const result = await dispatchEquipGradeRepository.find({});
    return result;
  }

  async getDispatchEquipGrade(id: number, qr?: QueryRunner) {
    const dispatchEquipGradeRepository =
      this.getDispatchEquipGradeRepository(qr);
    const result = await dispatchEquipGradeRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
