import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipGradeDto } from './create-equip_grade.dto';

export class UpdateEquipGradeDto extends PartialType(CreateEquipGradeDto) {}
