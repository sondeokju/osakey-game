import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EduListService } from './edu_list.service';
import { CreateEduListDto } from './dto/create-edu_list.dto';
import { UpdateEduListDto } from './dto/update-edu_list.dto';

@Controller('edu-list')
export class EduListController {
  constructor(private readonly eduListService: EduListService) {}

  @Post()
  create(@Body() createEduListDto: CreateEduListDto) {
    return this.eduListService.create(createEduListDto);
  }

  @Get()
  findAll() {
    return this.eduListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eduListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEduListDto: UpdateEduListDto) {
    return this.eduListService.update(+id, updateEduListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eduListService.remove(+id);
  }
}
