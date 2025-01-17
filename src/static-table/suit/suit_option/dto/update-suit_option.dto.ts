import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitOptionDto } from './create-suit_option.dto';

export class UpdateSuitOptionDto extends PartialType(CreateSuitOptionDto) {}
