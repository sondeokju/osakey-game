import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MissionKindService } from './mission_kind.service';
import { CreateMissionKindDto } from './dto/create-mission_kind.dto';
import { UpdateMissionKindDto } from './dto/update-mission_kind.dto';

@Controller('mission-kind')
export class MissionKindController {
  constructor(private readonly missionKindService: MissionKindService) {}
}
