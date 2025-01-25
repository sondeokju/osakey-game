import { Controller } from '@nestjs/common';
import { PuzzleStageService } from './puzzle_stage.service';

@Controller('puzzle/stage')
export class PuzzleStageController {
  constructor(private readonly battleStageService: PuzzleStageService) {}
}
