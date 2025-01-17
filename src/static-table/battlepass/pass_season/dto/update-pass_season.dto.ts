import { PartialType } from '@nestjs/mapped-types';
import { CreatePassSeasonDto } from './create-pass_season.dto';

export class UpdatePassSeasonDto extends PartialType(CreatePassSeasonDto) {}
