import { PartialType } from '@nestjs/mapped-types';
import { CreateUserItemDto } from './create-user_item.dto';

export class UpdateUserItemDto extends PartialType(CreateUserItemDto) {}
