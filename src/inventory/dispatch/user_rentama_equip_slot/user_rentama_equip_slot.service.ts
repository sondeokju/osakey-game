import { Injectable } from '@nestjs/common';
import { CreateUserRentamaEquipSlotDto } from './dto/create-user_rentama_equip_slot.dto';
import { UpdateUserRentamaEquipSlotDto } from './dto/update-user_rentama_equip_slot.dto';

@Injectable()
export class UserRentamaEquipSlotService {
  create(createUserRentamaEquipSlotDto: CreateUserRentamaEquipSlotDto) {
    return 'This action adds a new userRentamaEquipSlot';
  }

  findAll() {
    return `This action returns all userRentamaEquipSlot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRentamaEquipSlot`;
  }

  update(id: number, updateUserRentamaEquipSlotDto: UpdateUserRentamaEquipSlotDto) {
    return `This action updates a #${id} userRentamaEquipSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRentamaEquipSlot`;
  }
}
