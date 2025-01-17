import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemExchangeService } from './item_exchange.service';
import { CreateItemExchangeDto } from './dto/create-item_exchange.dto';
import { UpdateItemExchangeDto } from './dto/update-item_exchange.dto';

@Controller('item-exchange')
export class ItemExchangeController {
  constructor(private readonly itemExchangeService: ItemExchangeService) {}

  @Post()
  create(@Body() createItemExchangeDto: CreateItemExchangeDto) {
    return this.itemExchangeService.create(createItemExchangeDto);
  }

  @Get()
  findAll() {
    return this.itemExchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemExchangeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemExchangeDto: UpdateItemExchangeDto) {
    return this.itemExchangeService.update(+id, updateItemExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemExchangeService.remove(+id);
  }
}
