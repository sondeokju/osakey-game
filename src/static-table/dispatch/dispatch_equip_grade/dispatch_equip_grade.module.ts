import { Module } from '@nestjs/common';
import { DispatchEquipGradeService } from './dispatch_equip_grade.service';
import { DispatchEquipGradeController } from './dispatch_equip_grade.controller';

@Module({
  controllers: [DispatchEquipGradeController],
  providers: [DispatchEquipGradeService],
})
export class DispatchEquipGradeModule {}
