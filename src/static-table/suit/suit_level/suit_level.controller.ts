import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitLevelService } from './suit_level.service';
import { CreateSuitLevelDto } from './dto/create-suit_level.dto';
import { UpdateSuitLevelDto } from './dto/update-suit_level.dto';

@Controller('suit-level')
export class SuitLevelController {
  constructor(private readonly suitLevelService: SuitLevelService) {}

  @Post()
  create(@Body() createSuitLevelDto: CreateSuitLevelDto) {
    return this.suitLevelService.create(createSuitLevelDto);
  }

  @Get()
  findAll() {
    return this.suitLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitLevelDto: UpdateSuitLevelDto) {
    return this.suitLevelService.update(+id, updateSuitLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitLevelService.remove(+id);
  }
}
