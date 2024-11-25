import { Module } from '@nestjs/common';
import { DispatchEquipGradeService } from './dispatch_equip_grade.service';
import { DispatchEquipGradeController } from './dispatch_equip_grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchEquipGrade } from './entities/dispatch_equip_grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchEquipGrade])],
  exports: [DispatchEquipGradeService],
  controllers: [DispatchEquipGradeController],
  providers: [DispatchEquipGradeService],
})
export class DispatchEquipGradeModule {}
