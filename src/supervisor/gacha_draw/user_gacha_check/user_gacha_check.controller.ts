import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserGachaCheckService } from './user_gacha_check.service';

@Controller('user-gacha-check')
export class UserGachaCheckController {
  constructor(private readonly userGachaCheckService: UserGachaCheckService) {}
}
