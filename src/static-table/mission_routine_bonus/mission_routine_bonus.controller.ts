import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MissionRoutineBonusService } from './mission_routine_bonus.service';
import { CreateMissionRoutineBonusDto } from './dto/create-mission_routine_bonus.dto';
import { UpdateMissionRoutineBonusDto } from './dto/update-mission_routine_bonus.dto';

@Controller('mission-routine-bonus')
export class MissionRoutineBonusController {
  constructor(
    private readonly missionRoutineBonusService: MissionRoutineBonusService,
  ) {}
}
