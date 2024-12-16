import { Module } from '@nestjs/common';
import { EquipGradeService } from './equip_grade.service';
import { EquipGradeController } from './equip_grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipGrade } from './entities/equip_grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipGrade])],
  exports: [EquipGradeService],
  controllers: [EquipGradeController],
  providers: [EquipGradeService],
})
export class EquipGradeModule {}
