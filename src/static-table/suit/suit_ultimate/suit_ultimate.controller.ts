import { Controller } from '@nestjs/common';
import { SuitUltimateService } from './suit_ultimate.service';

@Controller('suit')
export class SuitUltimateController {
  constructor(private readonly suitUltimateService: SuitUltimateService) {}
}
