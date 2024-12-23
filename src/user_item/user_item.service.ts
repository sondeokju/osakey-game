import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserItem } from './entities/user_item.entity';
import { ItemService } from 'src/static-table/item/item.service';

@Injectable()
export class UserItemService {
  constructor(
    @InjectRepository(UserItem)
    private readonly userItemRepository: Repository<UserItem>,
    private readonly itemService: ItemService,
  ) {}

  getUserItemRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserItem>(UserItem)
      : this.userItemRepository;
  }

  async getUserItemAll(user_id: string, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);

    const result = await userItemRepository.find({
      where: {
        user_id,
      },
    });

    console.log('useritem:', result);
    return result;
  }

  async createItem(
    user_id: string,
    item_id: number,
    item_count: number,
    qr?: QueryRunner,
  ) {
    const userItemRepository = this.getUserItemRepository(qr);

    const itemData = await this.itemService.getItem(item_id);
    console.log('itemData:', itemData);

    const userItemData = await this.userItemRepository.findOne({
      where: {
        user_id: user_id,
        item_id: item_id,
      },
    });
    console.log('userItemData:', userItemData);

    let userObject = {};
    // if (!userItemData) {
    //   console.log('1');
    //   userObject = await userItemRepository.create({
    //     user_id: user_id,
    //     item_id: item_id,
    //     item_level: 1,
    //     item_type: 0, //itemData.item_category_value,
    //     item_count: item_count,
    //   });
    //   await userItemRepository.save(userObject);
    // } else {
    //   console.log('2');
    //   await userItemRepository.save({
    //     ...userItemData,
    //     item_count: userItemData.item_count + item_count,
    //   });
    // }

    return true;
  }

  async deleteItem(id: number, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);

    await userItemRepository.delete({
      id: id,
    });

    return true;
  }
  async reduceItem(
    user_id: string,
    item_id: number,
    qty: number,
    qr?: QueryRunner,
  ) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        user_id,
        item_id,
      },
    });

    if (!userItemData || userItemData.item_count <= 0) {
      throw new NotFoundException(`item ${item_id} not enough`);
    }

    await userItemRepository.save({
      ...userItemData,
      item_count: userItemData.item_count - qty,
    });

    return true;
  }

  async getItem(item_id: number, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        item_id,
      },
    });

    return userItemData;
  }

  async patchItem(id: number, item_count: number, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userItemData) {
      return false;
    }

    await userItemRepository.save({
      ...userItemData,
      item_count: userItemData.item_count + item_count,
    });

    return true;
  }

  async rewardItem(
    user_id: string,
    item_id: number,
    item_leve: number,
    item_type: string,
    item_count: number,
    qr?: QueryRunner,
  ) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userItemData) {
      const newUserItem = {
        user_id,
        item_id,
        item_leve,
        item_type,
        item_count,
      };

      await userItemRepository.insert(newUserItem);
    } else {
      const updatedData = { ...userItemData };

      if (item_id !== undefined) {
        updatedData.item_id = item_id;
      }

      if (item_leve !== undefined) {
        updatedData.item_level = item_leve;
      }

      if (item_type !== undefined) {
        updatedData.item_type = item_type;
      }

      if (item_count !== undefined) {
        updatedData.item_count = updatedData.item_count + item_count;
      }

      await userItemRepository.save(updatedData);
    }

    return true;
  }
}
