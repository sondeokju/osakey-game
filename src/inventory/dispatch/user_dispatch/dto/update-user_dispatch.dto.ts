import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDispatchDto } from './create-user_dispatch.dto';

export class UpdateUserDispatchDto extends PartialType(CreateUserDispatchDto) {}
