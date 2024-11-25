import { PartialType } from '@nestjs/mapped-types';
import { CreateEduListDto } from './create-edu_list.dto';

export class UpdateEduListDto extends PartialType(CreateEduListDto) {}
