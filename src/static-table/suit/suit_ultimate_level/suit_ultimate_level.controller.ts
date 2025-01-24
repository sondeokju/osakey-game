import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitUltimateLevelService } from './suit_ultimate_level.service';
import { CreateSuitUltimateLevelDto } from './dto/create-suit_ultimate_level.dto';
import { UpdateSuitUltimateLevelDto } from './dto/update-suit_ultimate_level.dto';

@Controller('suit-ultimate-level')
export class SuitUltimateLevelController {
  constructor(private readonly suitUltimateLevelService: SuitUltimateLevelService) {}

  @Post()
  create(@Body() createSuitUltimateLevelDto: CreateSuitUltimateLevelDto) {
    return this.suitUltimateLevelService.create(createSuitUltimateLevelDto);
  }

  @Get()
  findAll() {
    return this.suitUltimateLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitUltimateLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitUltimateLevelDto: UpdateSuitUltimateLevelDto) {
    return this.suitUltimateLevelService.update(+id, updateSuitUltimateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitUltimateLevelService.remove(+id);
  }
}
