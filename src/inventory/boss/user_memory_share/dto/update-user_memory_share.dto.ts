import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMemoryShareDto } from './create-user_memory_share.dto';

export class UpdateUserMemoryShareDto extends PartialType(CreateUserMemoryShareDto) {}
