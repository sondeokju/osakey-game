import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitUltimateInfoService } from './suit_ultimate_info.service';
import { CreateSuitUltimateInfoDto } from './dto/create-suit_ultimate_info.dto';
import { UpdateSuitUltimateInfoDto } from './dto/update-suit_ultimate_info.dto';

@Controller('suit-ultimate-info')
export class SuitUltimateInfoController {
  constructor(private readonly suitUltimateInfoService: SuitUltimateInfoService) {}

  @Post()
  create(@Body() createSuitUltimateInfoDto: CreateSuitUltimateInfoDto) {
    return this.suitUltimateInfoService.create(createSuitUltimateInfoDto);
  }

  @Get()
  findAll() {
    return this.suitUltimateInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitUltimateInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitUltimateInfoDto: UpdateSuitUltimateInfoDto) {
    return this.suitUltimateInfoService.update(+id, updateSuitUltimateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitUltimateInfoService.remove(+id);
  }
}
