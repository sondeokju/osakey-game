import { Controller, Get, Post } from '@nestjs/common';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';

@Controller('user-tuna-tv-online')
export class UserTunaTvOnlineController {
  constructor(
    private readonly userTunaTvOnlineService: UserTunaTvOnlineService,
  ) {}
}
