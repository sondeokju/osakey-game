import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionKindDto } from './create-mission_kind.dto';

export class UpdateMissionKindDto extends PartialType(CreateMissionKindDto) {}
