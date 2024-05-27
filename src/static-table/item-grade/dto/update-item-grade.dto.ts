import { PartialType } from '@nestjs/mapped-types';
import { CreateItemGradeDto } from './create-item-grade.dto';

export class UpdateItemGradeDto extends PartialType(CreateItemGradeDto) {}
