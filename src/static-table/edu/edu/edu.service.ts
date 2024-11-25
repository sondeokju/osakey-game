import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Edu } from './entities/edu.entity';

@Injectable()
export class EduService {
  constructor(
    @InjectRepository(Edu)
    private readonly eduRepository: Repository<Edu>,
  ) {}

  getEduRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Edu>(Edu) : this.eduRepository;
  }

  async getEduAll(qr?: QueryRunner) {
    const eduRepository = this.getEduRepository(qr);
    const result = await eduRepository.find({});
    return result;
  }

  async getEdu(edu_type: string, qr?: QueryRunner) {
    const eduRepository = this.getEduRepository(qr);
    const result = await eduRepository.findOne({
      where: {
        edu_type,
      },
    });

    return result;
  }
}
