import { PartialType } from '@nestjs/mapped-types';
import { CreateEduDto } from './create-edu.dto';

export class UpdateEduDto extends PartialType(CreateEduDto) {}
