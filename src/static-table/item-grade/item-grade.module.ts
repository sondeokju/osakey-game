import { Module } from '@nestjs/common';
import { ItemGradeService } from './item-grade.service';
import { ItemGradeController } from './item-grade.controller';

@Module({
  controllers: [ItemGradeController],
  providers: [ItemGradeService],
})
export class ItemGradeModule {}
