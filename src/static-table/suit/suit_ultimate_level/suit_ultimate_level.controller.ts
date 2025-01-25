import { Controller } from '@nestjs/common';
import { SuitUltimateLevelService } from './suit_ultimate_level.service';

@Controller('suit')
export class SuitUltimateLevelController {
  constructor(private readonly suitUltimateService: SuitUltimateLevelService) {}
}
