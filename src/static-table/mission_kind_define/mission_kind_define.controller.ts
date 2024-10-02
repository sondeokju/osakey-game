import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionKindDefineService } from './mission_kind_define.service';
import { CreateMissionKindDefineDto } from './dto/create-mission_kind_define.dto';
import { UpdateMissionKindDefineDto } from './dto/update-mission_kind_define.dto';

@Controller('mission-kind-define')
export class MissionKindDefineController {
  constructor(private readonly missionKindDefineService: MissionKindDefineService) {}

  @Post()
  create(@Body() createMissionKindDefineDto: CreateMissionKindDefineDto) {
    return this.missionKindDefineService.create(createMissionKindDefineDto);
  }

  @Get()
  findAll() {
    return this.missionKindDefineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionKindDefineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionKindDefineDto: UpdateMissionKindDefineDto) {
    return this.missionKindDefineService.update(+id, updateMissionKindDefineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionKindDefineService.remove(+id);
  }
}
