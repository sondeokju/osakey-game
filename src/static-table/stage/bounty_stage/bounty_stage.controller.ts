import { Controller } from '@nestjs/common';
import { BountyStageService } from './bounty_stage.service';

@Controller('bounty/stage')
export class BountyStageController {
  constructor(private readonly bountyStageService: BountyStageService) {}
}
