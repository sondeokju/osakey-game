import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Offline } from './entities/offline.entity';

@Injectable()
export class OfflineService {
  constructor(
    @InjectRepository(Offline)
    private readonly offlineRepository: Repository<Offline>,
  ) {}

  getOfflineRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Offline>(Offline)
      : this.offlineRepository;
  }

  async getOfflineAll(qr?: QueryRunner) {
    const attendanceRepository = this.getOfflineRepository(qr);
    const result = await attendanceRepository.find({});
    return result;
  }

  async getOfflineLevel(id: number, qr?: QueryRunner) {
    const offlineRepository = this.getOfflineRepository(qr);
    const result = await offlineRepository.findOne({
      where: {
        level: id,
      },
    });

    return result;
  }
}
