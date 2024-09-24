import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionRoutineDto } from './create-mission_routine.dto';

export class UpdateMissionRoutineDto extends PartialType(CreateMissionRoutineDto) {}
