import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EduCurriculum } from './entities/edu_curriculum.entity';

@Injectable()
export class EduCurriculumService {
  constructor(
    @InjectRepository(EduCurriculum)
    private readonly eduRepository: Repository<EduCurriculum>,
  ) {}

  getEduRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EduCurriculum>(EduCurriculum)
      : this.eduRepository;
  }

  async getEduAll(qr?: QueryRunner) {
    const eduRepository = this.getEduRepository(qr);
    const result = await eduRepository.find({});
    return result;
  }

  async getEdu(id: number, qr?: QueryRunner) {
    const eduRepository = this.getEduRepository(qr);
    const result = await eduRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
