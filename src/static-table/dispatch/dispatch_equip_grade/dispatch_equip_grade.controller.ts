import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchEquipGradeService } from './dispatch_equip_grade.service';
import { CreateDispatchEquipGradeDto } from './dto/create-dispatch_equip_grade.dto';
import { UpdateDispatchEquipGradeDto } from './dto/update-dispatch_equip_grade.dto';

@Controller('dispatch-equip-grade')
export class DispatchEquipGradeController {
  constructor(private readonly dispatchEquipGradeService: DispatchEquipGradeService) {}

  @Post()
  create(@Body() createDispatchEquipGradeDto: CreateDispatchEquipGradeDto) {
    return this.dispatchEquipGradeService.create(createDispatchEquipGradeDto);
  }

  @Get()
  findAll() {
    return this.dispatchEquipGradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchEquipGradeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchEquipGradeDto: UpdateDispatchEquipGradeDto) {
    return this.dispatchEquipGradeService.update(+id, updateDispatchEquipGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchEquipGradeService.remove(+id);
  }
}
