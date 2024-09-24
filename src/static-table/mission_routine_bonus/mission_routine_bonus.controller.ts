import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionRoutineBonusService } from './mission_routine_bonus.service';
import { CreateMissionRoutineBonusDto } from './dto/create-mission_routine_bonus.dto';
import { UpdateMissionRoutineBonusDto } from './dto/update-mission_routine_bonus.dto';

@Controller('mission-routine-bonus')
export class MissionRoutineBonusController {
  constructor(private readonly missionRoutineBonusService: MissionRoutineBonusService) {}

  @Post()
  create(@Body() createMissionRoutineBonusDto: CreateMissionRoutineBonusDto) {
    return this.missionRoutineBonusService.create(createMissionRoutineBonusDto);
  }

  @Get()
  findAll() {
    return this.missionRoutineBonusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionRoutineBonusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionRoutineBonusDto: UpdateMissionRoutineBonusDto) {
    return this.missionRoutineBonusService.update(+id, updateMissionRoutineBonusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionRoutineBonusService.remove(+id);
  }
}
