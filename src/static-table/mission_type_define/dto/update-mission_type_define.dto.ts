import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionTypeDefineDto } from './create-mission_type_define.dto';

export class UpdateMissionTypeDefineDto extends PartialType(CreateMissionTypeDefineDto) {}
