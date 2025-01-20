import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSecameMailDto } from './create-user_secame_mail.dto';

export class UpdateUserSecameMailDto extends PartialType(CreateUserSecameMailDto) {}
