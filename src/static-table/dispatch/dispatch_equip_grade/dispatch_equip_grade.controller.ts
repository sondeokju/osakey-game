import { Controller } from '@nestjs/common';
import { DispatchEquipGradeService } from './dispatch_equip_grade.service';

@Controller('dispatch-equip-grade')
export class DispatchEquipGradeController {
  constructor(
    private readonly dispatchEquipGradeService: DispatchEquipGradeService,
  ) {}
}
