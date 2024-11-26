import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEduAbilityDto } from './create-user_edu_ability.dto';

export class UpdateUserEduAbilityDto extends PartialType(CreateUserEduAbilityDto) {}
