import { PartialType } from '@nestjs/mapped-types';
import { CreatePassLevelDto } from './create-pass_level.dto';

export class UpdatePassLevelDto extends PartialType(CreatePassLevelDto) {}
