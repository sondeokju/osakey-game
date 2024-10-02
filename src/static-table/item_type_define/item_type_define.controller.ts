import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemTypeDefineService } from './item_type_define.service';
import { CreateItemTypeDefineDto } from './dto/create-item_type_define.dto';
import { UpdateItemTypeDefineDto } from './dto/update-item_type_define.dto';

@Controller('item-type-define')
export class ItemTypeDefineController {
  constructor(private readonly itemTypeDefineService: ItemTypeDefineService) {}

  @Post()
  create(@Body() createItemTypeDefineDto: CreateItemTypeDefineDto) {
    return this.itemTypeDefineService.create(createItemTypeDefineDto);
  }

  @Get()
  findAll() {
    return this.itemTypeDefineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypeDefineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemTypeDefineDto: UpdateItemTypeDefineDto) {
    return this.itemTypeDefineService.update(+id, updateItemTypeDefineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypeDefineService.remove(+id);
  }
}
