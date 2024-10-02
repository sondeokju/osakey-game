import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionTypeDto } from './create-mission_type.dto';

export class UpdateMissionTypeDto extends PartialType(CreateMissionTypeDto) {}
