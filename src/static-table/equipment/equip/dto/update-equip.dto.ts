import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipDto } from './create-equip.dto';

export class UpdateEquipDto extends PartialType(CreateEquipDto) {}
