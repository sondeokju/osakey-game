import { Controller } from '@nestjs/common';
import { DispatchRewardService } from './dispatch_reward.service';

@Controller('dispatch-reward')
export class DispatchRewardController {
  constructor(private readonly dispatchRewardService: DispatchRewardService) {}
}
