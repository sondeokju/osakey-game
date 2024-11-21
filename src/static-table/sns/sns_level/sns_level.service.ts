import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLevel } from './entities/sns_level.entity';

@Injectable()
export class SnsLevelService {
  constructor(
    @InjectRepository(SnsLevel)
    private readonly snsLevelRepository: Repository<SnsLevel>,
  ) {}

  getSnsLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SnsLevel>(SnsLevel)
      : this.snsLevelRepository;
  }

  async getSnsLevelAll(qr?: QueryRunner) {
    const snsLevelRepository = this.getSnsLevelRepository(qr);
    const result = await snsLevelRepository.find({});
    return result;
  }

  async getSnsLevel(sns_level: number, qr?: QueryRunner) {
    const snsLevelRepository = this.getSnsLevelRepository(qr);
    const result = await snsLevelRepository.findOne({
      where: {
        sns_level,
      },
    });

    return result;
  }
}
