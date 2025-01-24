import { PartialType } from '@nestjs/mapped-types';
import { CreatePuzzleStageDto } from './create-puzzle_stage.dto';

export class UpdatePuzzleStageDto extends PartialType(CreatePuzzleStageDto) {}
