import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  getItemRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Item>(Item) : this.itemRepository;
  }

  async getItemAll(qr?: QueryRunner) {
    const itemRepository = this.getItemRepository(qr);
    const result = await itemRepository.find({});
    return result;
  }

  async getItem(item_id: number, qr?: QueryRunner) {
    const itemRepository = this.getItemRepository(qr);
    const result = await itemRepository.findOne({
      where: {
        item_id,
      },
    });
    return result;
  }

  async getItemName(item_name: string, qr?: QueryRunner) {
    const itemRepository = this.getItemRepository(qr);
    const result = await itemRepository.findOne({
      where: {
        item_name,
      },
    });
    return result;
  }

  async getItemOne(item_id: number) {
    const result = this.itemRepository.findOne({
      where: {
        item_id,
      },
    });
    return result;
  }
}

// console.log('item:', result);
// const newItem = item.itemEquipslot;

// const result = { ...item, ...newItem };
// const result = Object.assign({}, item, { newItem });

// return Object.assign({}, item, { newItem });
// return 0;
