import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserItem } from './entities/user_item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UserItemService {
  constructor(
    @InjectRepository(UserItem)
    private readonly userItemRepository: Repository<UserItem>,
    private readonly itemService: ItemService,
    private readonly dataSource: DataSource,
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

    //console.log('useritem:', result);
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

    return {
      item_id: item_id,
      item_count: qty,
    };
  }

  async addItem(
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
      item_count: userItemData.item_count + qty,
    });

    return true;
  }

  async getItem(user_id: string, item_id: number, qr?: QueryRunner) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        user_id,
        item_id,
      },
    });

    return userItemData;
  }

  async getUserItemID(
    user_id: string,
    exchange_user_item_id: number,
    qr?: QueryRunner,
  ) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        id: exchange_user_item_id,
        user_id,
      },
    });

    return userItemData;
  }

  async getItemLevel(
    user_id: string,
    item_id: number,
    item_level: number,
    qr?: QueryRunner,
  ) {
    const userItemRepository = this.getUserItemRepository(qr);
    const userItemData = await userItemRepository.findOne({
      where: {
        user_id,
        item_id,
        item_level,
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
    item_level: number,
    item_type: string,
    item_count: number,
    qr?: QueryRunner,
  ) {
    const userItemRepository = this.getUserItemRepository(qr);

    const userItemData = await userItemRepository.findOne({
      where: {
        user_id,
        item_id,
        item_level,
      },
    });

    if (!userItemData) {
      const newUserItem = {
        user_id,
        item_id,
        item_level,
        item_type,
        item_count,
      };
      await userItemRepository.insert(newUserItem);
    } else {
      await userItemRepository.update(
        { user_id, item_id, item_level },
        { item_count: userItemData.item_count + item_count },
      );
    }

    return await userItemRepository.findOne({
      where: { user_id, item_id, item_level },
    });
  }

  // async rewardItem(
  //   user_id: string,
  //   item_id: number,
  //   item_level: number,
  //   item_type: string,
  //   item_count: number,
  //   qr?: QueryRunner,
  // ) {
  //   // QueryRunner 사용 설정 (없으면 새로 생성)
  //   const queryRunner = qr ?? this.dataSource.createQueryRunner();
  //   let isNewQueryRunner = false;

  //   if (!qr) {
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();
  //     isNewQueryRunner = true;
  //   }

  //   try {
  //     const userItemRepository = this.getUserItemRepository(queryRunner);

  //     const userItemData = await userItemRepository.findOne({
  //       where: {
  //         user_id,
  //         item_id,
  //         item_level,
  //       },
  //     });

  //     if (!userItemData) {
  //       const newUserItem = {
  //         user_id,
  //         item_id,
  //         item_level,
  //         item_type,
  //         item_count,
  //       };

  //       await userItemRepository.insert(newUserItem);
  //     } else {
  //       await userItemRepository.update(
  //         { user_id, item_id, item_level },
  //         { item_count: userItemData.item_count + item_count },
  //       );
  //     }

  //     // 🔹 user_id와 item_id로 안전하게 조회
  //     const newItem = await queryRunner.query(
  //       `SELECT * FROM user_item WHERE user_id = ? AND item_id = ?`,
  //       [user_id, item_id],
  //     );

  //     if (isNewQueryRunner) {
  //       await queryRunner.commitTransaction();
  //     }

  //     return newItem;
  //   } catch (error) {
  //     console.error('🔥 Error in rewardItem:', error);

  //     if (isNewQueryRunner) {
  //       await queryRunner.rollbackTransaction();
  //     }

  //     throw new InternalServerErrorException(
  //       'Failed to process item reward.',
  //       error,
  //     );
  //   } finally {
  //     if (isNewQueryRunner) {
  //       await queryRunner.release();
  //     }
  //   }
  // }
}
