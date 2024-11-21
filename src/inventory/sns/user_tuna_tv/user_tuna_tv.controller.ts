import { Controller, Get, Post } from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';

@Controller('user-tuna-tv')
export class UserTunaTvController {
  constructor(private readonly userTunaTvService: UserTunaTvService) {}
}
