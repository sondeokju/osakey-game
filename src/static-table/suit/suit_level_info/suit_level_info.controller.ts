import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitLevelInfoService } from './suit_level_info.service';
import { CreateSuitLevelInfoDto } from './dto/create-suit_level_info.dto';
import { UpdateSuitLevelInfoDto } from './dto/update-suit_level_info.dto';

@Controller('suit-level-info')
export class SuitLevelInfoController {
  constructor(private readonly suitLevelInfoService: SuitLevelInfoService) {}

  @Post()
  create(@Body() createSuitLevelInfoDto: CreateSuitLevelInfoDto) {
    return this.suitLevelInfoService.create(createSuitLevelInfoDto);
  }

  @Get()
  findAll() {
    return this.suitLevelInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitLevelInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitLevelInfoDto: UpdateSuitLevelInfoDto) {
    return this.suitLevelInfoService.update(+id, updateSuitLevelInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitLevelInfoService.remove(+id);
  }
}
