import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEquipmentDto } from './create-user-equipment.dto';

export class UpdateUserEquipmentDto extends PartialType(CreateUserEquipmentDto) {}
