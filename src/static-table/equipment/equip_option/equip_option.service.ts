import { Injectable } from '@nestjs/common';
import { CreateEquipOptionDto } from './dto/create-equip_option.dto';
import { UpdateEquipOptionDto } from './dto/update-equip_option.dto';

@Injectable()
export class EquipOptionService {
  create(createEquipOptionDto: CreateEquipOptionDto) {
    return 'This action adds a new equipOption';
  }

  findAll() {
    return `This action returns all equipOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipOption`;
  }

  update(id: number, updateEquipOptionDto: UpdateEquipOptionDto) {
    return `This action updates a #${id} equipOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipOption`;
  }
}
