import { Injectable } from '@nestjs/common';
import { CreateEquipDto } from './dto/create-equip.dto';
import { UpdateEquipDto } from './dto/update-equip.dto';

@Injectable()
export class EquipService {
  create(createEquipDto: CreateEquipDto) {
    return 'This action adds a new equip';
  }

  findAll() {
    return `This action returns all equip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equip`;
  }

  update(id: number, updateEquipDto: UpdateEquipDto) {
    return `This action updates a #${id} equip`;
  }

  remove(id: number) {
    return `This action removes a #${id} equip`;
  }
}
