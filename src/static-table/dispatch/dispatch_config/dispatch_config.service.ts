import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DispatchConfig } from './entities/dispatch_config.entity';

@Injectable()
export class DispatchConfigService {
  constructor(
    @InjectRepository(DispatchConfig)
    private readonly dispatchConfigRepository: Repository<DispatchConfig>,
  ) {}

  getDispatchConfigRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<DispatchConfig>(DispatchConfig)
      : this.dispatchConfigRepository;
  }

  async getDispatchConfigAll(qr?: QueryRunner) {
    const dispatchConfigRepository = this.getDispatchConfigRepository(qr);
    const result = await dispatchConfigRepository.find({});
    return result;
  }

  async getDispatchConfig(config_type: string, qr?: QueryRunner) {
    const dispatchRepository = this.getDispatchConfigRepository(qr);
    const result = await dispatchRepository.findOne({
      where: {
        config_type: config_type.trim(),
      },
    });

    return result;
  }
}
