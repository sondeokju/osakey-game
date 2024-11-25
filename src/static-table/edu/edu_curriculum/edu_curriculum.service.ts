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

  getEduCurriculumRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EduCurriculum>(EduCurriculum)
      : this.eduRepository;
  }

  async getEduCurriculumAll(qr?: QueryRunner) {
    const eduRepository = this.getEduCurriculumRepository(qr);
    const result = await eduRepository.find({});
    return result;
  }

  async getEduCurriculum(id: number, qr?: QueryRunner) {
    const eduRepository = this.getEduCurriculumRepository(qr);
    const result = await eduRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
