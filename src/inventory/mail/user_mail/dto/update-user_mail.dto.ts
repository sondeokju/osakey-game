import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMailDto } from './create-user_mail.dto';

export class UpdateUserMailDto extends PartialType(CreateUserMailDto) {}
