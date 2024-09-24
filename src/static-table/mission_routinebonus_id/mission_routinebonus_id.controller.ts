import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionRoutinebonusIdService } from './mission_routinebonus_id.service';
import { CreateMissionRoutinebonusIdDto } from './dto/create-mission_routinebonus_id.dto';
import { UpdateMissionRoutinebonusIdDto } from './dto/update-mission_routinebonus_id.dto';

@Controller('mission-routinebonus-id')
export class MissionRoutinebonusIdController {
  constructor(private readonly missionRoutinebonusIdService: MissionRoutinebonusIdService) {}

  @Post()
  create(@Body() createMissionRoutinebonusIdDto: CreateMissionRoutinebonusIdDto) {
    return this.missionRoutinebonusIdService.create(createMissionRoutinebonusIdDto);
  }

  @Get()
  findAll() {
    return this.missionRoutinebonusIdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionRoutinebonusIdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionRoutinebonusIdDto: UpdateMissionRoutinebonusIdDto) {
    return this.missionRoutinebonusIdService.update(+id, updateMissionRoutinebonusIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionRoutinebonusIdService.remove(+id);
  }
}
