import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAdDto } from './create-user_ad.dto';

export class UpdateUserAdDto extends PartialType(CreateUserAdDto) {}
