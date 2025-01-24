import { PartialType } from '@nestjs/mapped-types';
import { CreateRunStageDto } from './create-run_stage.dto';

export class UpdateRunStageDto extends PartialType(CreateRunStageDto) {}
