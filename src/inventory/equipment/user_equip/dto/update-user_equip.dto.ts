import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEquipDto } from './create-user_equip.dto';

export class UpdateUserEquipDto extends PartialType(CreateUserEquipDto) {}
