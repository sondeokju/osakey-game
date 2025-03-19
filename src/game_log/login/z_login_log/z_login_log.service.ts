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

  async logoutLog(user_id: string, qr?: QueryRunner) {
    const loginLogRepository = this.getZloginLogRepository(qr);

    const latestLogin = await loginLogRepository.findOne({
      where: { user_id, disconnected_at: null }, // 아직 로그아웃되지 않은 가장 최신 기록 찾기
      order: { update_at: 'DESC' },
    });

    // if (!latestLogin) {
    //   throw new NotFoundException(
    //     `No active session found for user ${user_id}`,
    //   );
    // }

    // 로그아웃 시간 기록
    await loginLogRepository.update(
      { id: latestLogin.id },
      { disconnected_at: new Date() },
    );

    return {
      message: `User ${user_id} disconnected at ${new Date().toISOString()}`,
    };
  }
}
