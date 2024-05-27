import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  create(_createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all item`;
  }

  // findOne(id: number) {
  //   const result = this.itemsRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   return result;
  // }

  async getItem(id: number) {
    const result = await this.itemsRepository.findOne({
      select: {
        index: true,
        name: true,
        item_category_name: true,
        item_category_value: true,
        debug_name: true,
        str_name: true,
        str_desc: true,
        res_icon_name: true,
        item_level: true,
      },
      where: {
        index: id,
      },
      relations: {
        item_equipslot_idx: true,
        item_grade_idx: true,
      },
    });

    //console.log('item:', result);
    //const newItem = item.itemEquipslot;

    //const result = { ...item, ...newItem };
    //const result = Object.assign({}, item, { newItem });

    //return Object.assign({}, item, { newItem });
    return result;
  }

  update(id: number, _updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
