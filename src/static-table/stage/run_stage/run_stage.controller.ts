import { Controller } from '@nestjs/common';
import { RunStageService } from './run_stage.service';

@Controller('run/stage')
export class RunStageController {
  constructor(private readonly runStageService: RunStageService) {}
}
