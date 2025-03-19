import { Controller } from '@nestjs/common';
import { GameLogsService } from './game_logs.service';

@Controller('logs')
export class GameLogsController {
  constructor(private readonly gameLogsService: GameLogsService) {}
}
