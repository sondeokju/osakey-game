import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DispatchTest } from './entities/dispatch_test.entity';

@Injectable()
export class DispatchTestService {
  constructor(
    @InjectRepository(DispatchTest)
    private readonly dispatchRepository: Repository<DispatchTest>,
  ) {}

  getDispatchTestRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<DispatchTest>(DispatchTest)
      : this.dispatchRepository;
  }

  async getDispatch(id: number, qr?: QueryRunner) {
    const dispatchTestRepository = this.getDispatchTestRepository(qr);
    const result = await dispatchTestRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
