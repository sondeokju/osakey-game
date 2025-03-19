import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { GameLogs } from './entities/game_logs.entity';

@Injectable()
export class GameLogsService {
  constructor(
    @InjectRepository(GameLogs)
    private readonly gameLogsRepository: Repository<GameLogs>,
  ) {}

  getLogRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<GameLogs>(GameLogs)
      : this.gameLogsRepository;
  }

  async insertLog(
    logType: string,
    userId: string,
    content: any,
    qr?: QueryRunner,
  ): Promise<void> {
    const gameLogsRepository = this.getLogRepository(qr);
    await gameLogsRepository.insert({
      log_type: logType,
      user_id: userId,
      content: content, // JSON 데이터 저장
    });
  }
}
