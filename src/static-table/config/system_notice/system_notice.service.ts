import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SystemNotice } from './entities/system_notice.entity';

@Injectable()
export class SystemNoticeService {
  constructor(
    @InjectRepository(SystemNotice)
    private readonly systemNoticeRepository: Repository<SystemNotice>,
  ) {}

  getSystemNoticeRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SystemNotice>(SystemNotice)
      : this.systemNoticeRepository;
  }

  async getSystemNoticeAll(qr?: QueryRunner) {
    const systemNoticeRepository = this.getSystemNoticeRepository(qr);
    const result = await systemNoticeRepository.find({});
    return result;
  }
}
