import { Controller } from '@nestjs/common';
import { SnsLevelService } from './sns_level.service';

@Controller('sns-level')
export class SnsLevelController {
  constructor(private readonly snsLevelService: SnsLevelService) {}
}
