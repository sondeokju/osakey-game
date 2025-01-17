import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitUltimateLevelInfoService } from './suit_ultimate_level_info.service';
import { CreateSuitUltimateLevelInfoDto } from './dto/create-suit_ultimate_level_info.dto';
import { UpdateSuitUltimateLevelInfoDto } from './dto/update-suit_ultimate_level_info.dto';

@Controller('suit-ultimate-level-info')
export class SuitUltimateLevelInfoController {
  constructor(private readonly suitUltimateLevelInfoService: SuitUltimateLevelInfoService) {}

  @Post()
  create(@Body() createSuitUltimateLevelInfoDto: CreateSuitUltimateLevelInfoDto) {
    return this.suitUltimateLevelInfoService.create(createSuitUltimateLevelInfoDto);
  }

  @Get()
  findAll() {
    return this.suitUltimateLevelInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitUltimateLevelInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitUltimateLevelInfoDto: UpdateSuitUltimateLevelInfoDto) {
    return this.suitUltimateLevelInfoService.update(+id, updateSuitUltimateLevelInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitUltimateLevelInfoService.remove(+id);
  }
}
