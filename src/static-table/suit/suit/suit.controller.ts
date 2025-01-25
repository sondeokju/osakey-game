import { Controller } from '@nestjs/common';
import { SuitService } from './suit.service';

@Controller('suit')
export class SuitController {
  constructor(private readonly runStageService: SuitService) {}
}
