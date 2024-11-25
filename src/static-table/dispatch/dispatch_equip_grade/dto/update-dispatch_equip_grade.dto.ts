import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchEquipGradeDto } from './create-dispatch_equip_grade.dto';

export class UpdateDispatchEquipGradeDto extends PartialType(CreateDispatchEquipGradeDto) {}
