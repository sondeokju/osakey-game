import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionTypeService } from './mission_type.service';
import { CreateMissionTypeDto } from './dto/create-mission_type.dto';
import { UpdateMissionTypeDto } from './dto/update-mission_type.dto';

@Controller('mission-type')
export class MissionTypeController {
  constructor(private readonly missionTypeService: MissionTypeService) {}

  @Post()
  create(@Body() createMissionTypeDto: CreateMissionTypeDto) {
    return this.missionTypeService.create(createMissionTypeDto);
  }

  @Get()
  findAll() {
    return this.missionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionTypeDto: UpdateMissionTypeDto) {
    return this.missionTypeService.update(+id, updateMissionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionTypeService.remove(+id);
  }
}
