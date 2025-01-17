import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitUltimateInfoDto } from './create-suit_ultimate_info.dto';

export class UpdateSuitUltimateInfoDto extends PartialType(CreateSuitUltimateInfoDto) {}
