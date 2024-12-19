import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipOptionService } from './equip_option.service';
import { CreateEquipOptionDto } from './dto/create-equip_option.dto';
import { UpdateEquipOptionDto } from './dto/update-equip_option.dto';

@Controller('equip-option')
export class EquipOptionController {
  constructor(private readonly equipOptionService: EquipOptionService) {}

  @Post()
  create(@Body() createEquipOptionDto: CreateEquipOptionDto) {
    return this.equipOptionService.create(createEquipOptionDto);
  }

  @Get()
  findAll() {
    return this.equipOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipOptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipOptionDto: UpdateEquipOptionDto) {
    return this.equipOptionService.update(+id, updateEquipOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipOptionService.remove(+id);
  }
}
