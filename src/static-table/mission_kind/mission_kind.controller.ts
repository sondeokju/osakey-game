import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionKindService } from './mission_kind.service';
import { CreateMissionKindDto } from './dto/create-mission_kind.dto';
import { UpdateMissionKindDto } from './dto/update-mission_kind.dto';

@Controller('mission-kind')
export class MissionKindController {
  constructor(private readonly missionKindService: MissionKindService) {}

  @Post()
  create(@Body() createMissionKindDto: CreateMissionKindDto) {
    return this.missionKindService.create(createMissionKindDto);
  }

  @Get()
  findAll() {
    return this.missionKindService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionKindService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionKindDto: UpdateMissionKindDto) {
    return this.missionKindService.update(+id, updateMissionKindDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionKindService.remove(+id);
  }
}
