import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMemoryRentDto } from './create-user_memory_rent.dto';

export class UpdateUserMemoryRentDto extends PartialType(CreateUserMemoryRentDto) {}
