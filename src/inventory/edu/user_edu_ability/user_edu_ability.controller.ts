import { Controller, Get, Post } from '@nestjs/common';
import { UserEduAbilityService } from './user_edu_ability.service';

@Controller('user-edu-ability')
export class UserEduAbilityController {
  constructor(private readonly userEduAbilityService: UserEduAbilityService) {}
}
