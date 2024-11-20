import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnsLevelService } from './sns_level.service';
import { CreateSnsLevelDto } from './dto/create-sns_level.dto';
import { UpdateSnsLevelDto } from './dto/update-sns_level.dto';

@Controller('sns-level')
export class SnsLevelController {
  constructor(private readonly snsLevelService: SnsLevelService) {}

  @Post()
  create(@Body() createSnsLevelDto: CreateSnsLevelDto) {
    return this.snsLevelService.create(createSnsLevelDto);
  }

  @Get()
  findAll() {
    return this.snsLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snsLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnsLevelDto: UpdateSnsLevelDto) {
    return this.snsLevelService.update(+id, updateSnsLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snsLevelService.remove(+id);
  }
}
