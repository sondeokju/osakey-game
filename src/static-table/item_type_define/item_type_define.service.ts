import { Injectable } from '@nestjs/common';
import { CreateItemTypeDefineDto } from './dto/create-item_type_define.dto';
import { UpdateItemTypeDefineDto } from './dto/update-item_type_define.dto';

@Injectable()
export class ItemTypeDefineService {
  create(createItemTypeDefineDto: CreateItemTypeDefineDto) {
    return 'This action adds a new itemTypeDefine';
  }

  findAll() {
    return `This action returns all itemTypeDefine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemTypeDefine`;
  }

  update(id: number, updateItemTypeDefineDto: UpdateItemTypeDefineDto) {
    return `This action updates a #${id} itemTypeDefine`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemTypeDefine`;
  }
}
