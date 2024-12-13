import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipGradeService } from './equip_grade.service';
import { CreateEquipGradeDto } from './dto/create-equip_grade.dto';
import { UpdateEquipGradeDto } from './dto/update-equip_grade.dto';

@Controller('equip-grade')
export class EquipGradeController {
  constructor(private readonly equipGradeService: EquipGradeService) {}

  @Post()
  create(@Body() createEquipGradeDto: CreateEquipGradeDto) {
    return this.equipGradeService.create(createEquipGradeDto);
  }

  @Get()
  findAll() {
    return this.equipGradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipGradeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipGradeDto: UpdateEquipGradeDto) {
    return this.equipGradeService.update(+id, updateEquipGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipGradeService.remove(+id);
  }
}
