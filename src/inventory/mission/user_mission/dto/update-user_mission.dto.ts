import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMissionDto } from './create-user_mission.dto';

export class UpdateUserMissionDto extends PartialType(CreateUserMissionDto) {}
