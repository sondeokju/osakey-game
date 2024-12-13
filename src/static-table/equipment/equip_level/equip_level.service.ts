import { Injectable } from '@nestjs/common';
import { CreateEquipLevelDto } from './dto/create-equip_level.dto';
import { UpdateEquipLevelDto } from './dto/update-equip_level.dto';

@Injectable()
export class EquipLevelService {
  create(createEquipLevelDto: CreateEquipLevelDto) {
    return 'This action adds a new equipLevel';
  }

  findAll() {
    return `This action returns all equipLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipLevel`;
  }

  update(id: number, updateEquipLevelDto: UpdateEquipLevelDto) {
    return `This action updates a #${id} equipLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipLevel`;
  }
}
