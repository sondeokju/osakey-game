import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { GameLogs } from './entities/game_logs.entity';

@Injectable()
export class GameLogsService {
  constructor(
    @InjectRepository(GameLogs)
    private readonly LogRepository: Repository<GameLogs>,
  ) {}

  getLogRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<GameLogs>(GameLogs)
      : this.LogRepository;
  }

  // async logoutLog(user_id: string, qr?: QueryRunner) {
  //   const loginLogRepository = this.getZloginLogRepository(qr);

  //   const latestLogin = await loginLogRepository.findOne({
  //     where: { user_id, disconnected_at: null }, // 아직 로그아웃되지 않은 가장 최신 기록 찾기
  //     order: { update_at: 'DESC' },
  //   });

  //   // if (!latestLogin) {
  //   //   throw new NotFoundException(
  //   //     `No active session found for user ${user_id}`,
  //   //   );
  //   // }

  //   // 로그아웃 시간 기록
  //   await loginLogRepository.update(
  //     { id: latestLogin.id },
  //     { disconnected_at: new Date() },
  //   );

  //   return {
  //     message: `User ${user_id} disconnected at ${new Date().toISOString()}`,
  //   };
  // }
}
