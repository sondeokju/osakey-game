import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionRoutineService } from './mission_routine.service';
import { CreateMissionRoutineDto } from './dto/create-mission_routine.dto';
import { UpdateMissionRoutineDto } from './dto/update-mission_routine.dto';

@Controller('mission-routine')
export class MissionRoutineController {
  constructor(private readonly missionRoutineService: MissionRoutineService) {}

  @Post()
  create(@Body() createMissionRoutineDto: CreateMissionRoutineDto) {
    return this.missionRoutineService.create(createMissionRoutineDto);
  }

  @Get()
  findAll() {
    return this.missionRoutineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionRoutineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionRoutineDto: UpdateMissionRoutineDto) {
    return this.missionRoutineService.update(+id, updateMissionRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionRoutineService.remove(+id);
  }
}
