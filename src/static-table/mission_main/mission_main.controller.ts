import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MissionMainService } from './mission_main.service';
import { CreateMissionMainDto } from './dto/create-mission_main.dto';
import { UpdateMissionMainDto } from './dto/update-mission_main.dto';

@Controller('mission-main')
export class MissionMainController {
  constructor(private readonly missionMainService: MissionMainService) {}
}
