import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemGradeService } from './item-grade.service';
import { CreateItemGradeDto } from './dto/create-item-grade.dto';
import { UpdateItemGradeDto } from './dto/update-item-grade.dto';

@Controller('item-grade')
export class ItemGradeController {
  constructor(private readonly itemGradeService: ItemGradeService) {}

  @Post()
  create(@Body() createItemGradeDto: CreateItemGradeDto) {
    return this.itemGradeService.create(createItemGradeDto);
  }

  @Get()
  findAll() {
    return this.itemGradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemGradeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemGradeDto: UpdateItemGradeDto) {
    return this.itemGradeService.update(+id, updateItemGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemGradeService.remove(+id);
  }
}
