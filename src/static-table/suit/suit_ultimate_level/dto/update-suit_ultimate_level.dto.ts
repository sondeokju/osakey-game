import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitUltimateLevelDto } from './create-suit_ultimate_level.dto';

export class UpdateSuitUltimateLevelDto extends PartialType(CreateSuitUltimateLevelDto) {}
