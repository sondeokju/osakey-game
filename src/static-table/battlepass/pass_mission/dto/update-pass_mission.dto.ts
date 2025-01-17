import { PartialType } from '@nestjs/mapped-types';
import { CreatePassMissionDto } from './create-pass_mission.dto';

export class UpdatePassMissionDto extends PartialType(CreatePassMissionDto) {}
