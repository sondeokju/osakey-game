import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';
import { CreateUserRentamaEquipSlotDto } from './dto/create-user_rentama_equip_slot.dto';
import { UpdateUserRentamaEquipSlotDto } from './dto/update-user_rentama_equip_slot.dto';

@Controller('user-rentama-equip-slot')
export class UserRentamaEquipSlotController {
  constructor(private readonly userRentamaEquipSlotService: UserRentamaEquipSlotService) {}

  @Post()
  create(@Body() createUserRentamaEquipSlotDto: CreateUserRentamaEquipSlotDto) {
    return this.userRentamaEquipSlotService.create(createUserRentamaEquipSlotDto);
  }

  @Get()
  findAll() {
    return this.userRentamaEquipSlotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRentamaEquipSlotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRentamaEquipSlotDto: UpdateUserRentamaEquipSlotDto) {
    return this.userRentamaEquipSlotService.update(+id, updateUserRentamaEquipSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRentamaEquipSlotService.remove(+id);
  }
}
