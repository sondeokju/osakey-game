import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitUltimateDto } from './create-suit_ultimate.dto';

export class UpdateSuitUltimateDto extends PartialType(CreateSuitUltimateDto) {}
