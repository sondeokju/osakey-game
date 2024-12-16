import { Controller } from '@nestjs/common';
import { EquipGradeService } from './equip_grade.service';

@Controller('equip-grade')
export class EquipGradeController {
  constructor(private readonly equipGradeService: EquipGradeService) {}
}
