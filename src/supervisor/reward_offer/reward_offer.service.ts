import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { ItemService } from 'src/static-table/item/item.service';
import { DataSource } from 'typeorm';

@Injectable()
export class RewardOfferService {
  constructor(
    private readonly rewardService: RewardService,
    private readonly usersService: UsersService,
    private readonly itemService: ItemService,
    private readonly userItemService: UserItemService,
    private readonly dataSource: DataSource,
  ) {}
  async reward(user_id: string, reward_id: number, qr?: QueryRunner) {
    const rewardData = await this.rewardService.getReward(reward_id);
    console.log('rewardData', rewardData);

    let result = [];

    for (const reward of rewardData) {
      let obj = {};

      Object.entries(reward).forEach(([key, value]) => {
        obj[`${key}`] = `${value}`;
      });

      const itemData = await this.itemService.getItem(+obj['item_id']);

      console.log('item_type', itemData.item_type);

      if (['C'].includes(itemData.item_type)) {
        await this.rewardCurrency(
          user_id,
          itemData.item_name,
          reward.item_count,
          qr,
        );
      } else if (['M', 'S'].includes(itemData.item_type)) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type,
          reward.item_count,
          qr,
        );
      }

      obj['item_id'] = itemData.item_id;
      obj['item_type'] = itemData.item_type;
      obj['item_name'] = itemData.item_name;
      //obj['item_count'] = reward.item_qty;

      result.push(obj);
    }

    return result;
  }

  async rewardItem(
    user_id: string,
    item_id: number,
    qty: number,
    qr?: QueryRunner,
  ) {
    let result = [];
    let obj = {};

    const itemData = await this.itemService.getItem(item_id);

    if (itemData.item_type == 'C') {
      await this.rewardCurrency(user_id, itemData.item_name, qty, qr);
    }

    if (['M', 'S'].includes(itemData.item_type)) {
      await this.userItemService.rewardItem(
        user_id,
        itemData.item_id,
        itemData.item_grade,
        itemData.item_type,
        qty,
        qr,
      );
    } else if (['E'].includes(itemData.item_type)) {
      await this.createEquipQuery(user_id, item_id, qr);
    } else if (['C'].includes(itemData.item_type)) {
      await this.rewardCurrency(user_id, itemData.item_type, qty, qr);
    }

    obj['item_id'] = itemData.item_id;
    obj['item_type'] = itemData.item_type;
    obj['item_name'] = itemData.item_name;

    result.push(obj);

    return result;
  }

  async rewardItemsArray(
    items: { item_id: number; qty: number }[],
    user_id: string,
    qr?: QueryRunner,
  ) {
    let result = [];

    for (const { item_id, qty } of items) {
      const itemData = await this.itemService.getItem(item_id);

      if (['M', 'S'].includes(itemData.item_type)) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type,
          qty,
          qr,
        );
      } else if (itemData.item_type === 'C') {
        await this.rewardCurrency(user_id, itemData.item_name, qty, qr);
      }

      result.push({
        item_id: itemData.item_id,
        item_type: itemData.item_type,
        item_name: itemData.item_name,
        qty,
      });
    }

    return result;
  }

  async rewardSameItemArray(
    user_id: string,
    items: { item_id: number }[],
    qr?: QueryRunner,
  ) {
    let result = [];

    const qty = items.length;
    for (const { item_id } of items) {
      const itemData = await this.itemService.getItem(item_id);

      if (['M', 'S'].includes(itemData.item_type)) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type,
          qty,
          qr,
        );
      }

      result.push({
        item_id: itemData.item_id,
        item_type: itemData.item_type,
        item_name: itemData.item_name,
        qty,
      });
    }

    return result;
  }

  async rewardEquipArray(
    user_id: string,
    equips: { equip_id: number }[],
    qr?: QueryRunner,
  ) {
    let result = [];
    console.log('rewardEquipArray equips:', equips);

    for (const equip of equips) {
      await this.createEquipQuery(user_id, equip.equip_id, qr);
      console.log('getEquipQuery equip_id:', equip.equip_id);
      const equipData = await this.getEquipQuery(equip.equip_id, qr);
      console.log('getEquipQuery equipData:', equipData);

      result.push({
        equip_id: equip.equip_id,
        origin_equip_id: equipData.origin_equip_id,
        equip_enum: equipData.equip_enum,
        equip_name: equipData.equip_name,
        equip_slot: equipData.equip_slot,
        equip_grade: equipData.equip_grade,
      });
    }

    return result;
  }

  async rewardCurrency(
    user_id: string,
    item_name: string,
    qty: number,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.usersService.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userData) {
      throw new Error('User not found');
    }

    const updatedData = { ...userData };

    console.log('item_name', item_name);
    console.log('qty', qty);

    switch (item_name) {
      case 'seca_coin':
        updatedData.seca_coin = updatedData.seca_coin + qty;
        break;
      case 'gord':
        updatedData.gord = updatedData.gord + qty;
        break;
      case 'diamond_paid':
        updatedData.diamond_paid = updatedData.diamond_paid + qty;
        break;
      case 'diamond_free':
        updatedData.diamond_free = updatedData.diamond_free + qty;
        break;
      case 'exp':
        updatedData.exp = updatedData.exp + qty;
        break;
      case 'battery':
        updatedData.battery = updatedData.battery + qty;
        break;
      case 'revive_coin':
        updatedData.revive_coin = updatedData.revive_coin + qty;
        break;
      // default:
      //   response = 'Unknown item type.';
      //   break;
    }

    await usersRepository.save(updatedData);

    return true;
  }

  async rewardCurrencyAll(
    user_id: string,
    rewards: { [key: string]: number }, // 여러 개의 보상을 받도록 변경
    qr?: QueryRunner,
  ) {
    const usersRepository = this.usersService.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: { user_id },
    });

    if (!userData) {
      throw new Error('User not found');
    }

    console.log('Rewards:', rewards);

    // 각 보상을 userData에 반영
    Object.keys(rewards).forEach((item_name) => {
      if (userData.hasOwnProperty(item_name)) {
        userData[item_name] += rewards[item_name]; // 기존 값에 추가
      } else {
        console.warn(`Unknown reward item: ${item_name}`);
      }
    });

    // 업데이트된 데이터 저장
    await usersRepository.save(userData);

    return true;
  }

  async getEquipQuery(equip_id: number, qr?: QueryRunner) {
    const queryRunner = qr ?? this.dataSource.createQueryRunner(); // QueryRunner가 없으면 새로 생성
    const connection = queryRunner.manager;

    const result = await connection.query(
      `SELECT * FROM equip WHERE equip_id = ?`,
      [equip_id],
    );

    return result.length > 0 ? result[0] : null; // 단일 객체 반환
  }

  async createEquipQuery(user_id: string, equip_id: number, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    if (!equip_id || isNaN(equip_id)) {
      throw new BadRequestException('Invalid equip_id provided.');
    }

    const equip_level_id = `${equip_id}01`;

    // QueryRunner 사용 설정 (없으면 생성)
    const queryRunner = qr ?? this.dataSource.createQueryRunner();
    if (!qr) await queryRunner.connect();

    try {
      // Equip Level 조회
      const equipLevelResult = await queryRunner.query(
        `SELECT * FROM equip_level WHERE equip_level_id = ?`,
        [+equip_level_id],
      );

      if (equipLevelResult.length === 0) {
        throw new NotFoundException(
          `Equip level with ID ${equip_level_id} not found.`,
        );
      }

      const equipLevel = equipLevelResult[0];

      // 새로운 장비 추가
      await queryRunner.query(
        `INSERT INTO user_equip (user_id, equip_id, equip_level_id) VALUES (?, ?, ?)`,
        [user_id, equip_id, equipLevel.equip_level_id],
      );

      // 사용자 장비 목록 조회
      const userEquipList = await queryRunner.query(
        `SELECT * FROM user_equip WHERE user_id = ?`,
        [user_id],
      );

      return userEquipList;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create equip', error);
    } finally {
      if (!qr) await queryRunner.release(); // 사용한 QueryRunner 해제
    }
  }
}
