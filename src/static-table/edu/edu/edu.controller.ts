import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EduService } from './edu.service';
import { CreateEduDto } from './dto/create-edu.dto';
import { UpdateEduDto } from './dto/update-edu.dto';

@Controller('edu')
export class EduController {
  constructor(private readonly eduService: EduService) {}

  @Post()
  create(@Body() createEduDto: CreateEduDto) {
    return this.eduService.create(createEduDto);
  }

  @Get()
  findAll() {
    return this.eduService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eduService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEduDto: UpdateEduDto) {
    return this.eduService.update(+id, updateEduDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eduService.remove(+id);
  }
}
