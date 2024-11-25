import { Controller } from '@nestjs/common';
import { EduService } from './edu.service';

@Controller('edu')
export class EduController {
  constructor(private readonly eduService: EduService) {}
}
