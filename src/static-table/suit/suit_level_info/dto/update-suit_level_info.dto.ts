import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitLevelInfoDto } from './create-suit_level_info.dto';

export class UpdateSuitLevelInfoDto extends PartialType(CreateSuitLevelInfoDto) {}
