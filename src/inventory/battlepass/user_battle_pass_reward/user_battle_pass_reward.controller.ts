import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserBattlePassRewardService } from './user_battle_pass_reward.service';

@Controller('user-battle-pass-reward')
export class UserBattlePassRewardController {
  constructor(
    private readonly userBattlePassRewardService: UserBattlePassRewardService,
  ) {}
}
