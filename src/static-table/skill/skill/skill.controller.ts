import { Controller } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('skill')
export class SecameDiaryController {
  constructor(private readonly skillService: SkillService) {}
}
