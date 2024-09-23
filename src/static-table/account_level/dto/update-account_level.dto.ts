import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountLevelDto } from './create-account_level.dto';

export class UpdateAccountLevelDto extends PartialType(CreateAccountLevelDto) {}
