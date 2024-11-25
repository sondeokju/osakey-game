import { Controller } from '@nestjs/common';
import { EduCurriculumService } from './edu_curriculum.service';

@Controller('edu-curriculum')
export class EduCurriculumController {
  constructor(private readonly eduCurriculumService: EduCurriculumService) {}
}
