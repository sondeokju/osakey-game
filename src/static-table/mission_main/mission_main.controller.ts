import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionMainService } from './mission_main.service';
import { CreateMissionMainDto } from './dto/create-mission_main.dto';
import { UpdateMissionMainDto } from './dto/update-mission_main.dto';

@Controller('mission-main')
export class MissionMainController {
  constructor(private readonly missionMainService: MissionMainService) {}

  @Post()
  create(@Body() createMissionMainDto: CreateMissionMainDto) {
    return this.missionMainService.create(createMissionMainDto);
  }

  @Get()
  findAll() {
    return this.missionMainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionMainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionMainDto: UpdateMissionMainDto) {
    return this.missionMainService.update(+id, updateMissionMainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionMainService.remove(+id);
  }
}
