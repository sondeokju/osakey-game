import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitUltimateService } from './suit_ultimate.service';
import { CreateSuitUltimateDto } from './dto/create-suit_ultimate.dto';
import { UpdateSuitUltimateDto } from './dto/update-suit_ultimate.dto';

@Controller('suit-ultimate')
export class SuitUltimateController {
  constructor(private readonly suitUltimateService: SuitUltimateService) {}

  @Post()
  create(@Body() createSuitUltimateDto: CreateSuitUltimateDto) {
    return this.suitUltimateService.create(createSuitUltimateDto);
  }

  @Get()
  findAll() {
    return this.suitUltimateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitUltimateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitUltimateDto: UpdateSuitUltimateDto) {
    return this.suitUltimateService.update(+id, updateSuitUltimateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitUltimateService.remove(+id);
  }
}
