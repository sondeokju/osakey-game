import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitInfoService } from './suit_info.service';
import { CreateSuitInfoDto } from './dto/create-suit_info.dto';
import { UpdateSuitInfoDto } from './dto/update-suit_info.dto';

@Controller('suit-info')
export class SuitInfoController {
  constructor(private readonly suitInfoService: SuitInfoService) {}

  @Post()
  create(@Body() createSuitInfoDto: CreateSuitInfoDto) {
    return this.suitInfoService.create(createSuitInfoDto);
  }

  @Get()
  findAll() {
    return this.suitInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitInfoDto: UpdateSuitInfoDto) {
    return this.suitInfoService.update(+id, updateSuitInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitInfoService.remove(+id);
  }
}
