import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipLevelService } from './equip_level.service';
import { CreateEquipLevelDto } from './dto/create-equip_level.dto';
import { UpdateEquipLevelDto } from './dto/update-equip_level.dto';

@Controller('equip-level')
export class EquipLevelController {
  constructor(private readonly equipLevelService: EquipLevelService) {}

  @Post()
  create(@Body() createEquipLevelDto: CreateEquipLevelDto) {
    return this.equipLevelService.create(createEquipLevelDto);
  }

  @Get()
  findAll() {
    return this.equipLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipLevelDto: UpdateEquipLevelDto) {
    return this.equipLevelService.update(+id, updateEquipLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipLevelService.remove(+id);
  }
}
