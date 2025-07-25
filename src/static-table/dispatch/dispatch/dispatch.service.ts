import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, QueryRunner, Repository } from 'typeorm';
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

  async getDispatchGreateRate(dispatch_rank: string, qr?: QueryRunner) {
    const dispatchRepository = this.getDispatchRepository(qr);
    const result = await dispatchRepository.findOne({
      where: {
        dispatch_rank,
      },
    });

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

  async getDispatchLevel(dispatch_exp_total: number, qr?: QueryRunner) {
    const dispatchRepository = this.getDispatchRepository(qr);
    const result = await dispatchRepository.find({
      where: {
        dispatch_exp_total: MoreThanOrEqual(dispatch_exp_total),
      },
      order: {
        dispatch_exp_total: 'ASC',
      },
      take: 1,
    });

    return result.length > 0 ? result[0] : null;
  }
}
