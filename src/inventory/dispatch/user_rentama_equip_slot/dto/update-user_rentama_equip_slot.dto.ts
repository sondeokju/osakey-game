import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRentamaEquipSlotDto } from './create-user_rentama_equip_slot.dto';

export class UpdateUserRentamaEquipSlotDto extends PartialType(CreateUserRentamaEquipSlotDto) {}
