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

  async loginLog(
    user_id: string,
    member_id: string,
    social_user_id: string,
    social_type: string,
    qr?: QueryRunner,
  ) {
    // 트랜잭션 레포지토리 가져오기
    const userAchievementsRepository = this.getZloginLogRepository(qr);

    // 삽입할 데이터 생성
    const logData = userAchievementsRepository.create({
      user_id,
      member_id,
      social_user_id,
      social_type,
    });

    // 데이터 저장 (save 사용)
    const savedLog = await userAchievementsRepository.save(logData);

    return savedLog;
  }
}
