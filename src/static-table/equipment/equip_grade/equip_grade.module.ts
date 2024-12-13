import { Module } from '@nestjs/common';
import { EquipGradeService } from './equip_grade.service';
import { EquipGradeController } from './equip_grade.controller';

@Module({
  controllers: [EquipGradeController],
  providers: [EquipGradeService],
})
export class EquipGradeModule {}
