import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsConfig } from './entities/sns_config.entity';

@Injectable()
export class SnsConfigService {
  constructor(
    @InjectRepository(SnsConfig)
    private readonly snsConfigRepository: Repository<SnsConfig>,
  ) {}

  getSnsConfigRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SnsConfig>(SnsConfig)
      : this.snsConfigRepository;
  }

  async getSnsConfigAll(qr?: QueryRunner) {
    const snsConfigRepository = this.getSnsConfigRepository(qr);
    const result = await snsConfigRepository.find({});
    return result;
  }

  async getSnsConfig(config_type: string, qr?: QueryRunner) {
    const snsConfigRepository = this.getSnsConfigRepository(qr);
    const result = await snsConfigRepository.findOne({
      where: {
        config_type: config_type.trim(),
      },
    });

    return result;
  }
}
