import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionRoutinebonusIdDto } from './create-mission_routinebonus_id.dto';

export class UpdateMissionRoutinebonusIdDto extends PartialType(CreateMissionRoutinebonusIdDto) {}
