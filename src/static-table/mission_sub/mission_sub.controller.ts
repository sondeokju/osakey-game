import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionSubService } from './mission_sub.service';
import { CreateMissionSubDto } from './dto/create-mission_sub.dto';
import { UpdateMissionSubDto } from './dto/update-mission_sub.dto';

@Controller('mission-sub')
export class MissionSubController {
  constructor(private readonly missionSubService: MissionSubService) {}

  @Post()
  create(@Body() createMissionSubDto: CreateMissionSubDto) {
    return this.missionSubService.create(createMissionSubDto);
  }

  @Get()
  findAll() {
    return this.missionSubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionSubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionSubDto: UpdateMissionSubDto) {
    return this.missionSubService.update(+id, updateMissionSubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionSubService.remove(+id);
  }
}
