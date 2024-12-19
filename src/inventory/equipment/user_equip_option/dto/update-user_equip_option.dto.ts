import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEquipOptionDto } from './create-user_equip_option.dto';

export class UpdateUserEquipOptionDto extends PartialType(CreateUserEquipOptionDto) {}
