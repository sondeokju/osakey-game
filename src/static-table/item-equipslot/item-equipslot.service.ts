import { Injectable } from '@nestjs/common';
import { CreateItemEquipslotDto } from './dto/create-item-equipslot.dto';
import { UpdateItemEquipslotDto } from './dto/update-item-equipslot.dto';

@Injectable()
export class ItemEquipslotService {
  create(createItemEquipslotDto: CreateItemEquipslotDto) {
    return 'This action adds a new itemEquipslot';
  }

  findAll() {
    return `This action returns all itemEquipslot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemEquipslot`;
  }

  update(id: number, updateItemEquipslotDto: UpdateItemEquipslotDto) {
    return `This action updates a #${id} itemEquipslot`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemEquipslot`;
  }
}
