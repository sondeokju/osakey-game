import { Controller } from '@nestjs/common';
import { BattleStageService } from './battle_stage.service';

@Controller('battle/stage')
export class BattleStageController {
  constructor(private readonly battleStageService: BattleStageService) {}
}
