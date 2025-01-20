import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSuitDto } from './create-user_suit.dto';

export class UpdateUserSuitDto extends PartialType(CreateUserSuitDto) {}
