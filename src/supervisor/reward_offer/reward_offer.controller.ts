import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardOfferService } from './reward_offer.service';

@Controller('reward-inven')
export class RewardInvenController {
  constructor(private readonly rewardOfferService: RewardOfferService) {}
}
