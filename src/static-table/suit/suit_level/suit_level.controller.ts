import { Controller } from '@nestjs/common';
import { SuitLevelService } from './suit_level.service';

@Controller('suit')
export class SuitLevelController {
  constructor(private readonly suitLevelService: SuitLevelService) {}
}
