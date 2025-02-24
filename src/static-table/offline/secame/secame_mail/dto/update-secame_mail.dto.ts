import { PartialType } from '@nestjs/mapped-types';
import { CreateSecameMailDto } from './create-secame_mail.dto';

export class UpdateSecameMailDto extends PartialType(CreateSecameMailDto) {}
