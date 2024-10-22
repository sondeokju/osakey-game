import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardInvenService } from './reward_inven.service';

@Controller('reward-inven')
export class RewardInvenController {
  constructor(private readonly rewardInvenService: RewardInvenService) {}
}
