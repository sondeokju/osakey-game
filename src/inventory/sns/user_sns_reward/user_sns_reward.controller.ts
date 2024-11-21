import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';

@Controller('user-sns-reward')
export class UserSnsRewardController {
  constructor(private readonly userSnsRewardService: UserSnsRewardService) {}
}
