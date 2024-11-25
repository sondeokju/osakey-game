import { Injectable } from '@nestjs/common';
import { CreateDispatchEquipLevelDto } from './dto/create-dispatch_equip_level.dto';
import { UpdateDispatchEquipLevelDto } from './dto/update-dispatch_equip_level.dto';

@Injectable()
export class DispatchEquipLevelService {
  create(createDispatchEquipLevelDto: CreateDispatchEquipLevelDto) {
    return 'This action adds a new dispatchEquipLevel';
  }

  findAll() {
    return `This action returns all dispatchEquipLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatchEquipLevel`;
  }

  update(id: number, updateDispatchEquipLevelDto: UpdateDispatchEquipLevelDto) {
    return `This action updates a #${id} dispatchEquipLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatchEquipLevel`;
  }
}
