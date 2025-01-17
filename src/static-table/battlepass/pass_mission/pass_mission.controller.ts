import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassMissionService } from './pass_mission.service';
import { CreatePassMissionDto } from './dto/create-pass_mission.dto';
import { UpdatePassMissionDto } from './dto/update-pass_mission.dto';

@Controller('pass-mission')
export class PassMissionController {
  constructor(private readonly passMissionService: PassMissionService) {}

  @Post()
  create(@Body() createPassMissionDto: CreatePassMissionDto) {
    return this.passMissionService.create(createPassMissionDto);
  }

  @Get()
  findAll() {
    return this.passMissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passMissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassMissionDto: UpdatePassMissionDto) {
    return this.passMissionService.update(+id, updatePassMissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passMissionService.remove(+id);
  }
}
