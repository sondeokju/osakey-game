import { Injectable } from '@nestjs/common';
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

  async getUserItemAll(user_id: number, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);

    const result = await userItemRepository.find({
      where: {
        user_id: user_id,
      },
    });
    return result;
  }

  async createItem(
    user_id: number,
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
    if (!userItemData) {
      console.log('1');
      userObject = await userItemRepository.create({
        user_id: user_id,
        item_id: item_id,
        item_level: 1,
        item_type: 0, //itemData.item_category_value,
        item_count: item_count,
      });
      await userItemRepository.save(userObject);
    } else {
      console.log('2');
      await userItemRepository.save({
        ...userItemData,
        item_count: userItemData.item_count + item_count,
      });
    }

    return true;
  }

  async deleteItem(id: number, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);

    await userItemRepository.delete({
      id: id,
    });

    return true;
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

  // create(createUserItemDto: CreateUserItemDto) {
  //   return 'This action adds a new userItem';
  // }

  findAll() {
    return `This action returns all userItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userItem`;
  }

  // update(id: number, updateUserItemDto: UpdateUserItemDto) {
  //   return `This action updates a #${id} userItem`;
  // }

  remove(id: number) {
    return `This action removes a #${id} userItem`;
  }
}
