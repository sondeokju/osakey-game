import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchEquipLevelService } from './dispatch_equip_level.service';
import { CreateDispatchEquipLevelDto } from './dto/create-dispatch_equip_level.dto';
import { UpdateDispatchEquipLevelDto } from './dto/update-dispatch_equip_level.dto';

@Controller('dispatch-equip-level')
export class DispatchEquipLevelController {
  constructor(private readonly dispatchEquipLevelService: DispatchEquipLevelService) {}

  @Post()
  create(@Body() createDispatchEquipLevelDto: CreateDispatchEquipLevelDto) {
    return this.dispatchEquipLevelService.create(createDispatchEquipLevelDto);
  }

  @Get()
  findAll() {
    return this.dispatchEquipLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchEquipLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchEquipLevelDto: UpdateDispatchEquipLevelDto) {
    return this.dispatchEquipLevelService.update(+id, updateDispatchEquipLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchEquipLevelService.remove(+id);
  }
}
