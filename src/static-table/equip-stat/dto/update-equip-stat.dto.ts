import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipStatDto } from './create-equip-stat.dto';

export class UpdateEquipStatDto extends PartialType(CreateEquipStatDto) {}
