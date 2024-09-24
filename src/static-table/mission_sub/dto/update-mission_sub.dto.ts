import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionSubDto } from './create-mission_sub.dto';

export class UpdateMissionSubDto extends PartialType(CreateMissionSubDto) {}
