import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionEquipDto } from './create-collection_equip.dto';

export class UpdateCollectionEquipDto extends PartialType(CreateCollectionEquipDto) {}
