import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitOptionService } from './suit_option.service';
import { CreateSuitOptionDto } from './dto/create-suit_option.dto';
import { UpdateSuitOptionDto } from './dto/update-suit_option.dto';

@Controller('suit-option')
export class SuitOptionController {
  constructor(private readonly suitOptionService: SuitOptionService) {}

  @Post()
  create(@Body() createSuitOptionDto: CreateSuitOptionDto) {
    return this.suitOptionService.create(createSuitOptionDto);
  }

  @Get()
  findAll() {
    return this.suitOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitOptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitOptionDto: UpdateSuitOptionDto) {
    return this.suitOptionService.update(+id, updateSuitOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitOptionService.remove(+id);
  }
}
