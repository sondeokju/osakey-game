import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAbilityStatDto } from './create-user_ability_stat.dto';

export class UpdateUserAbilityStatDto extends PartialType(CreateUserAbilityStatDto) {}
