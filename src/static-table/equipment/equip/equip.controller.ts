import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipService } from './equip.service';
import { CreateEquipDto } from './dto/create-equip.dto';
import { UpdateEquipDto } from './dto/update-equip.dto';

@Controller('equip')
export class EquipController {
  constructor(private readonly equipService: EquipService) {}

  @Post()
  create(@Body() createEquipDto: CreateEquipDto) {
    return this.equipService.create(createEquipDto);
  }

  @Get()
  findAll() {
    return this.equipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipDto: UpdateEquipDto) {
    return this.equipService.update(+id, updateEquipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipService.remove(+id);
  }
}
