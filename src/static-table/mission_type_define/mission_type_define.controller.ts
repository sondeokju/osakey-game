import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionTypeDefineService } from './mission_type_define.service';
import { CreateMissionTypeDefineDto } from './dto/create-mission_type_define.dto';
import { UpdateMissionTypeDefineDto } from './dto/update-mission_type_define.dto';

@Controller('mission-type-define')
export class MissionTypeDefineController {
  constructor(private readonly missionTypeDefineService: MissionTypeDefineService) {}

  @Post()
  create(@Body() createMissionTypeDefineDto: CreateMissionTypeDefineDto) {
    return this.missionTypeDefineService.create(createMissionTypeDefineDto);
  }

  @Get()
  findAll() {
    return this.missionTypeDefineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionTypeDefineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionTypeDefineDto: UpdateMissionTypeDefineDto) {
    return this.missionTypeDefineService.update(+id, updateMissionTypeDefineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionTypeDefineService.remove(+id);
  }
}
