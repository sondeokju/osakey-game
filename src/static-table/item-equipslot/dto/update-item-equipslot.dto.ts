import { PartialType } from '@nestjs/mapped-types';
import { CreateItemEquipslotDto } from './create-item-equipslot.dto';

export class UpdateItemEquipslotDto extends PartialType(
  CreateItemEquipslotDto,
) {}
