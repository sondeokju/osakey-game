import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitDto } from './create-suit.dto';

export class UpdateSuitDto extends PartialType(CreateSuitDto) {}
