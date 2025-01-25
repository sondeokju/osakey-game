import { Controller } from '@nestjs/common';
import { SuitSkillService } from './suit_skill.service';

@Controller('suit')
export class SuitSkillController {
  constructor(private readonly suitSkillService: SuitSkillService) {}
}
