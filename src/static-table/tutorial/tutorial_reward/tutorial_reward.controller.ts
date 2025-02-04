import { Controller } from '@nestjs/common';
import { TutorialRewardService } from './tutorial_reward.service';

@Controller('tutorial')
export class TutorialRewardController {
  constructor(private readonly tutorialRewardService: TutorialRewardService) {}
}
