import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitLevelDto } from './create-suit_level.dto';

export class UpdateSuitLevelDto extends PartialType(CreateSuitLevelDto) {}
