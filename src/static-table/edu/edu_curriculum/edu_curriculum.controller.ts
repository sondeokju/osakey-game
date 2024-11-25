import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EduCurriculumService } from './edu_curriculum.service';
import { CreateEduCurriculumDto } from './dto/create-edu_curriculum.dto';
import { UpdateEduCurriculumDto } from './dto/update-edu_curriculum.dto';

@Controller('edu-curriculum')
export class EduCurriculumController {
  constructor(private readonly eduCurriculumService: EduCurriculumService) {}

  @Post()
  create(@Body() createEduCurriculumDto: CreateEduCurriculumDto) {
    return this.eduCurriculumService.create(createEduCurriculumDto);
  }

  @Get()
  findAll() {
    return this.eduCurriculumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eduCurriculumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEduCurriculumDto: UpdateEduCurriculumDto) {
    return this.eduCurriculumService.update(+id, updateEduCurriculumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eduCurriculumService.remove(+id);
  }
}
