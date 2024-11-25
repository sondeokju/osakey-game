import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EduReduceTimeService } from './edu_reduce_time.service';
import { CreateEduReduceTimeDto } from './dto/create-edu_reduce_time.dto';
import { UpdateEduReduceTimeDto } from './dto/update-edu_reduce_time.dto';

@Controller('edu-reduce-time')
export class EduReduceTimeController {
  constructor(private readonly eduReduceTimeService: EduReduceTimeService) {}

  @Post()
  create(@Body() createEduReduceTimeDto: CreateEduReduceTimeDto) {
    return this.eduReduceTimeService.create(createEduReduceTimeDto);
  }

  @Get()
  findAll() {
    return this.eduReduceTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eduReduceTimeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEduReduceTimeDto: UpdateEduReduceTimeDto) {
    return this.eduReduceTimeService.update(+id, updateEduReduceTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eduReduceTimeService.remove(+id);
  }
}
