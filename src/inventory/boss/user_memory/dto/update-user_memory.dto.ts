import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMemoryDto } from './create-user_memory.dto';

export class UpdateUserMemoryDto extends PartialType(CreateUserMemoryDto) {}
