import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserItemExchangeService } from './user_item_exchange.service';
import { CreateUserItemExchangeDto } from './dto/create-user_item_exchange.dto';
import { UpdateUserItemExchangeDto } from './dto/update-user_item_exchange.dto';

@Controller('user-item-exchange')
export class UserItemExchangeController {
  constructor(private readonly userItemExchangeService: UserItemExchangeService) {}

  @Post()
  create(@Body() createUserItemExchangeDto: CreateUserItemExchangeDto) {
    return this.userItemExchangeService.create(createUserItemExchangeDto);
  }

  @Get()
  findAll() {
    return this.userItemExchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userItemExchangeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserItemExchangeDto: UpdateUserItemExchangeDto) {
    return this.userItemExchangeService.update(+id, updateUserItemExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userItemExchangeService.remove(+id);
  }
}
