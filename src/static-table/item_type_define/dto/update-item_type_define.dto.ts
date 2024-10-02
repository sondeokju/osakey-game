import { PartialType } from '@nestjs/mapped-types';
import { CreateItemTypeDefineDto } from './create-item_type_define.dto';

export class UpdateItemTypeDefineDto extends PartialType(CreateItemTypeDefineDto) {}
