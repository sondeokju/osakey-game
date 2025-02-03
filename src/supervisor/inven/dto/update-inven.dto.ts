import { PartialType } from '@nestjs/mapped-types';
import { CreateInvenDto } from './create-inven.dto';

export class UpdateInvenDto extends PartialType(CreateInvenDto) {}
