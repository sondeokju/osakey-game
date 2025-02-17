import { Controller } from '@nestjs/common';
import { UserAchieveRankingService } from './user_achieve_ranking.service';

@Controller('user-achieve-ranking')
export class UserAchieveRankingController {
  constructor(
    private readonly userAchieveRankingService: UserAchieveRankingService,
  ) {}
}
