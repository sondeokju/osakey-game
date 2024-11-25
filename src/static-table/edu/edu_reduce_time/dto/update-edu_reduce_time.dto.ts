import { PartialType } from '@nestjs/mapped-types';
import { CreateEduReduceTimeDto } from './create-edu_reduce_time.dto';

export class UpdateEduReduceTimeDto extends PartialType(CreateEduReduceTimeDto) {}
