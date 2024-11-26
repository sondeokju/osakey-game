import { Controller, Get, Post } from '@nestjs/common';
import { UserEduStatsService } from './user_edu_stats.service';

@Controller('user-edu-stats')
export class UserEduStatsController {
  constructor(private readonly userEduStatsService: UserEduStatsService) {}
}
