import { Controller, Get, Post } from '@nestjs/common';
import { UserMissionService } from './user_mission.service';

@Controller('user-mission')
export class UserMissionController {
  constructor(private readonly userMissionService: UserMissionService) {}
}
