import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipLevelDto } from './create-equip_level.dto';

export class UpdateEquipLevelDto extends PartialType(CreateEquipLevelDto) {}
