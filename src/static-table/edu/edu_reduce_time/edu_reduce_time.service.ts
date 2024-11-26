import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EduReduceTime } from './entities/edu_reduce_time.entity';

@Injectable()
export class EduReduceTimeService {
  constructor(
    @InjectRepository(EduReduceTime)
    private readonly eduReduceTimeRepository: Repository<EduReduceTime>,
  ) {}

  getEduReduceTimeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EduReduceTime>(EduReduceTime)
      : this.eduReduceTimeRepository;
  }

  async getEduReduceTimeAll(qr?: QueryRunner) {
    const eduReduceTimeRepository = this.getEduReduceTimeRepository(qr);
    const result = await eduReduceTimeRepository.find({});
    return result;
  }

  async getEduReduceTime(id: number, qr?: QueryRunner) {
    const eduReduceTimeRepository = this.getEduReduceTimeRepository(qr);
    const result = await eduReduceTimeRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
