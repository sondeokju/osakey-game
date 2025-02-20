import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ZLoginLog } from './entities/z_login_log.entity';

@Injectable()
export class ZLoginLogService {
  constructor(
    @InjectRepository(ZLoginLog)
    private readonly zLoginLogRepository: Repository<ZLoginLog>,
  ) {}

  getZloginLogRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<ZLoginLog>(ZLoginLog)
      : this.zLoginLogRepository;
  }

  async getLoginLog(user_id: string, qr?: QueryRunner) {
    const loginLogRepository = this.getZloginLogRepository(qr);

    const latestLog = await loginLogRepository.findOne({
      where: { user_id },
      order: { update_at: 'DESC' },
    });

    return latestLog;
  }

  async loginLog(
    user_id: string,
    member_id: string,
    social_user_id: string,
    social_type?: string,
    qr?: QueryRunner,
  ) {
    const userAchievementsRepository = this.getZloginLogRepository(qr);

    const logData = userAchievementsRepository.create({
      user_id,
      member_id,
      social_user_id,
      social_type: '',
    });

    const savedLog = await userAchievementsRepository.save(logData);

    return savedLog;
  }
}
