import { PartialType } from '@nestjs/mapped-types';
import { CreateEduCurriculumDto } from './create-edu_curriculum.dto';

export class UpdateEduCurriculumDto extends PartialType(CreateEduCurriculumDto) {}
