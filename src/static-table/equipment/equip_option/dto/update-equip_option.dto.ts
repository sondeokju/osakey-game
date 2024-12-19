import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipOptionDto } from './create-equip_option.dto';

export class UpdateEquipOptionDto extends PartialType(CreateEquipOptionDto) {}
