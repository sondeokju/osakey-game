import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHeroDto } from './create-user_hero.dto';

export class UpdateUserHeroDto extends PartialType(CreateUserHeroDto) {}
