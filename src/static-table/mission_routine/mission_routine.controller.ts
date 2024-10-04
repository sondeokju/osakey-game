import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MissionRoutineService } from './mission_routine.service';
import { CreateMissionRoutineDto } from './dto/create-mission_routine.dto';
import { UpdateMissionRoutineDto } from './dto/update-mission_routine.dto';

@Controller('mission-routine')
export class MissionRoutineController {
  constructor(private readonly missionRoutineService: MissionRoutineService) {}
}
