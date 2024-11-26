import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEduStatDto } from './create-user_edu_stat.dto';

export class UpdateUserEduStatDto extends PartialType(CreateUserEduStatDto) {}
