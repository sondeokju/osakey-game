import { Controller, Get, Post } from '@nestjs/common';
import { UserSnsLevelService } from './user_sns_level.service';

@Controller('user-sns-level')
export class UserSnsLevelController {
  constructor(private readonly userSnsLevelService: UserSnsLevelService) {}
}
