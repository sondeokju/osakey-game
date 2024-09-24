import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionMainDto } from './create-mission_main.dto';

export class UpdateMissionMainDto extends PartialType(CreateMissionMainDto) {}
