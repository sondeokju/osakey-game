import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchEquipLevelDto } from './create-dispatch_equip_level.dto';

export class UpdateDispatchEquipLevelDto extends PartialType(CreateDispatchEquipLevelDto) {}
