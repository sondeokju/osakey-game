import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitUltimateLevelInfoDto } from './create-suit_ultimate_level_info.dto';

export class UpdateSuitUltimateLevelInfoDto extends PartialType(CreateSuitUltimateLevelInfoDto) {}
