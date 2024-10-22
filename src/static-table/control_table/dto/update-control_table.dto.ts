import { PartialType } from '@nestjs/mapped-types';
import { CreateControlTableDto } from './create-control_table.dto';

export class UpdateControlTableDto extends PartialType(CreateControlTableDto) {}
