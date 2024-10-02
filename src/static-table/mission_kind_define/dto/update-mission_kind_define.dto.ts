import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionKindDefineDto } from './create-mission_kind_define.dto';

export class UpdateMissionKindDefineDto extends PartialType(CreateMissionKindDefineDto) {}
