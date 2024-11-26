import { Controller, Get, Post } from '@nestjs/common';
import { UserAbilityStatsService } from './user_ability_stats.service';

@Controller('user-ability-stats')
export class UserAbilityStatsController {
  constructor(
    private readonly userAbilityStatsService: UserAbilityStatsService,
  ) {}
}
