import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionRoutineBonusDto } from './create-mission_routine_bonus.dto';

export class UpdateMissionRoutineBonusDto extends PartialType(CreateMissionRoutineBonusDto) {}
