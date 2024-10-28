import { Injectable } from '@nestjs/common';
import { CreateLogUrlDto } from './dto/create-log_url.dto';
import { UpdateLogUrlDto } from './dto/update-log_url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogUrl } from './entities/log_url.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class LogUrlService {
  constructor(
    @InjectRepository(LogUrl)
    private readonly urlLogRepository: Repository<LogUrl>,
  ) {}

  getUrlLogRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<LogUrl>(LogUrl)
      : this.urlLogRepository;
  }

  // async logRequest(url: string, method: string, timestamp: Date) {
  //   const log = this.logRepository.create({ url, method, timestamp });
  //   await this.logRepository.save(log);
  // }

  async urlLog(url: string, method: string, create_at: Date, qr?: QueryRunner) {
    const urlLogRepository = this.getUrlLogRepository(qr);

    await urlLogRepository.save({
      url,
      method,
      create_at,
    });
  }
}
