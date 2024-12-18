import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserBattleService } from './user_battle.service';

@Controller('user-battle')
export class UserBattleController {
  constructor(private readonly userBattleService: UserBattleService) {}
}
