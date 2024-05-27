import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEquipmentSlotDto } from './create-user-equipment-slot.dto';

export class UpdateUserEquipmentSlotDto extends PartialType(CreateUserEquipmentSlotDto) {}
