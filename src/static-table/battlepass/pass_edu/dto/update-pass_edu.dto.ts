import { PartialType } from '@nestjs/mapped-types';
import { CreatePassEduDto } from './create-pass_edu.dto';

export class UpdatePassEduDto extends PartialType(CreatePassEduDto) {}
