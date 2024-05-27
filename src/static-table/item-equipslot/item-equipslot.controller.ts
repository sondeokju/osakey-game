import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemEquipslotService } from './item-equipslot.service';
import { CreateItemEquipslotDto } from './dto/create-item-equipslot.dto';
import { UpdateItemEquipslotDto } from './dto/update-item-equipslot.dto';

@Controller('item-equipslot')
export class ItemEquipslotController {
  constructor(private readonly itemEquipslotService: ItemEquipslotService) {}

  @Post()
  create(@Body() createItemEquipslotDto: CreateItemEquipslotDto) {
    return this.itemEquipslotService.create(createItemEquipslotDto);
  }

  @Get()
  findAll() {
    return this.itemEquipslotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemEquipslotService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemEquipslotDto: UpdateItemEquipslotDto,
  ) {
    return this.itemEquipslotService.update(+id, updateItemEquipslotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemEquipslotService.remove(+id);
  }
}
