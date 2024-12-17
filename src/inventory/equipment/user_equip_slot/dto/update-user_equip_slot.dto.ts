import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEquipSlotDto } from './create-user_equip_slot.dto';

export class UpdateUserEquipSlotDto extends PartialType(CreateUserEquipSlotDto) {}
