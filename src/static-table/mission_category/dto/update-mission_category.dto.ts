import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionCategoryDto } from './create-mission_category.dto';

export class UpdateMissionCategoryDto extends PartialType(CreateMissionCategoryDto) {}
