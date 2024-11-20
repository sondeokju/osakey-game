import { PartialType } from '@nestjs/mapped-types';
import { CreateSnsLevelDto } from './create-sns_level.dto';

export class UpdateSnsLevelDto extends PartialType(CreateSnsLevelDto) {}
