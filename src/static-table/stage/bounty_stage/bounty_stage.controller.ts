import { Controller } from '@nestjs/common';
import { BountyStageService } from './bounty_stage.service';

@Controller('bounty/stage')
export class BattleStageController {
  constructor(private readonly bountyStageService: BountyStageService) {}
}
