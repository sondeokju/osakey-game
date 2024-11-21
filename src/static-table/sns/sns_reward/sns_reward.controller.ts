import { Controller } from '@nestjs/common';
import { SnsRewardService } from './sns_reward.service';

@Controller('sns-reward')
export class SnsRewardController {
  constructor(private readonly snsRewardService: SnsRewardService) {}
}
