import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSnsLevelDto } from './create-user_sns_level.dto';

export class UpdateUserSnsLevelDto extends PartialType(CreateUserSnsLevelDto) {}
