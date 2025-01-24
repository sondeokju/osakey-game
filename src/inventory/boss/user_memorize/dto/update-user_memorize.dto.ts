import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMemorizeDto } from './create-user_memorize.dto';

export class UpdateUserMemorizeDto extends PartialType(CreateUserMemorizeDto) {}
