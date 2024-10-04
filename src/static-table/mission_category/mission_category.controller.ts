import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionCategoryService } from './mission_category.service';
import { CreateMissionCategoryDto } from './dto/create-mission_category.dto';
import { UpdateMissionCategoryDto } from './dto/update-mission_category.dto';

@Controller('mission-category')
export class MissionCategoryController {
  constructor(private readonly missionCategoryService: MissionCategoryService) {}

  @Post()
  create(@Body() createMissionCategoryDto: CreateMissionCategoryDto) {
    return this.missionCategoryService.create(createMissionCategoryDto);
  }

  @Get()
  findAll() {
    return this.missionCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionCategoryDto: UpdateMissionCategoryDto) {
    return this.missionCategoryService.update(+id, updateMissionCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionCategoryService.remove(+id);
  }
}
