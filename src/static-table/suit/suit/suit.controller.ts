import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitService } from './suit.service';
import { CreateSuitDto } from './dto/create-suit.dto';
import { UpdateSuitDto } from './dto/update-suit.dto';

@Controller('suit')
export class SuitController {
  constructor(private readonly suitService: SuitService) {}

  @Post()
  create(@Body() createSuitDto: CreateSuitDto) {
    return this.suitService.create(createSuitDto);
  }

  @Get()
  findAll() {
    return this.suitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitDto: UpdateSuitDto) {
    return this.suitService.update(+id, updateSuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitService.remove(+id);
  }
}
