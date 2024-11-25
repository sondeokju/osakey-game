import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Dispatch } from './entities/dispatch.entity';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(Dispatch)
    private readonly dispatchRepository: Repository<Dispatch>,
  ) {}

  getDispatchRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Dispatch>(Dispatch)
      : this.dispatchRepository;
  }

  async getDispatchAll(qr?: QueryRunner) {
    const dispatchRepository = this.getDispatchRepository(qr);
    const result = await dispatchRepository.find({});
    return result;
  }

  async getDispatch(dispatch_exp_total: number, qr?: QueryRunner) {
    const dispatchRepository = this.getDispatchRepository(qr);
    const result = await dispatchRepository.findOne({
      where: {
        dispatch_exp_total,
      },
    });

    return result;
  }
}
