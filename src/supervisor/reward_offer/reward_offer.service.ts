import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, QueryRunner } from 'typeorm';
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

  // async secameCreditReward(
  //   user_id: string,
  //   secame_credit: number,
  //   qr?: QueryRunner,
  // ) {
  //   return await this.usersService.secamCreditReward(
  //     user_id,
  //     secame_credit,
  //     qr,
  //   );
  // }

  async secameCreditReward(
    user_id: string,
    secame_credit: number,
    qr?: QueryRunner,
  ) {
    return await this.usersService.secamCreditReward(
      user_id,
      secame_credit,
      qr,
    );
  }

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

      if (['C'].includes(itemData.item_type.trim())) {
        await this.rewardCurrency(
          user_id,
          itemData.item_name.trim(),
          reward.item_count,
          qr,
        );
      } else if (['M', 'S'].includes(itemData.item_type.trim())) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type.trim(),
          reward.item_count,
          qr,
        );
      }

      obj['item_id'] = itemData.item_id;
      obj['item_count'] = reward.item_count;

      result.push(obj);
    }

    // 🔹 "id" 및 "reward_id" 키 삭제
    result = result.map(({ id, reward_id, ...rest }) => rest);
    console.log('result:', result);
    return result;
  }

  async rewardCustom(user_id: string, reward_id: number, qr?: QueryRunner) {
    const rewardData = await this.rewardService.getReward(reward_id);
    console.log('rewardData', rewardData);

    let result = new Map<number, { item_id: number; item_count: number }>();

    for (const reward of rewardData) {
      let obj = {};

      Object.entries(reward).forEach(([key, value]) => {
        obj[`${key}`] = `${value}`;
      });

      const itemData = await this.itemService.getItem(+obj['item_id']);

      if (['C'].includes(itemData.item_type.trim())) {
        await this.rewardCurrency(
          user_id,
          itemData.item_name.trim(),
          reward.item_count,
          qr,
        );
      } else if (['M', 'S'].includes(itemData.item_type.trim())) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type.trim(),
          reward.item_count,
          qr,
        );
      }

      const item_id = itemData.item_id;
      const item_count = reward.item_count;

      // 기존 데이터가 있으면 item_count 누적
      if (result.has(item_id)) {
        result.get(item_id)!.item_count += item_count;
      } else {
        result.set(item_id, { item_id, item_count });
      }
    }

    // 결과 배열 변환
    const finalResult = Array.from(result.values());

    console.log('finalResult:', finalResult);
    return finalResult;
  }

  async rewardItem(
    user_id: string,
    item_id: number,
    qty: number,
    qr?: QueryRunner,
  ) {
    const itemData = await this.itemService.getItem(item_id, qr);
    if (!itemData) {
      throw new NotFoundException(`Item ${item_id} not found.`);
    }

    switch (itemData.item_type.trim()) {
      case 'C': // 화폐 보상
        await this.rewardCurrency(user_id, itemData.item_name.trim(), qty, qr);
        break;

      case 'M':
      case 'S':
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type.trim(),
          qty,
          qr,
        );
        break;

      case 'E': // 장비 보상
        await this.createEquipQuery(user_id, item_id, qr);
        break;

      default:
        throw new BadRequestException(
          `Invalid item type: ${itemData.item_type}`,
        );
    }

    return [
      {
        item_id: itemData.item_id,
        item_type: itemData.item_type,
        item_name: itemData.item_name.trim(),
        //item_count: qty, // 보상 개수 추가
      },
    ];
  }

  async rewardItemsArray(
    user_id: string,
    items: { item_id: number; item_count: number }[],
    qr?: QueryRunner,
  ) {
    let result = [];

    for (const { item_id, item_count } of items) {
      const itemData = await this.itemService.getItem(item_id);

      switch (itemData.item_type.trim()) {
        case 'M':
        case 'S':
          await this.userItemService.rewardItem(
            user_id,
            itemData.item_id,
            itemData.item_grade,
            itemData.item_type.trim(),
            item_count,
            qr,
          );
          break;
        case 'C':
          await this.rewardCurrency(
            user_id,
            itemData.item_name.trim(),
            item_count,
            qr,
          );
          break;
        case 'E':
          await this.createEquipQuery(user_id, item_id, qr);
          break;

        default:
          throw new BadRequestException(
            `Invalid item type: ${itemData.item_type}`,
          );
      }

      result.push({
        item_id: itemData.item_id,
        item_count,
      });
    }

    return result;
  }

  async rewardSameItemNumberArray(
    user_id: string,
    items: number[],
    qr?: QueryRunner,
  ) {
    let itemId;

    const item_count = items.length;
    for (const item_id of items) {
      itemId = item_id;
      const itemData = await this.itemService.getItem(item_id);

      if (['M', 'S'].includes(itemData.item_type.trim())) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type.trim(),
          item_count,
          qr,
        );
      }
    }

    const userItemData = await this.userItemService.getItem(
      user_id,
      itemId,
      qr,
    );
    return {
      userItemData: [userItemData],
    };
  }

  async rewardSameItemArray(
    user_id: string,
    items: { item_id: number }[],
    qr?: QueryRunner,
  ) {
    let itemId;
    const item_count = items.length;
    for (const { item_id } of items) {
      itemId = item_id;
      const itemData = await this.itemService.getItem(item_id);

      if (['M', 'S'].includes(itemData.item_type.trim())) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type.trim(),
          item_count,
          qr,
        );
      }
    }

    return {
      item_id: itemId,
      item_count,
    };
  }

  async rewardEquipArray(
    user_id: string,
    equips: number[], // 숫자 배열
    qr?: QueryRunner,
  ) {
    console.log('rewardEquipArray equips:', equips);

    let equipList = []; // 단일 배열로 유지

    for (const equip_id of equips) {
      console.log('getEquipQuery equip_id:', equip_id, typeof equip_id);

      const userEquipData = await this.createEquipQuery(user_id, equip_id, qr);
      console.log('getEquipQuery userEquipData:', userEquipData);

      equipList.push(userEquipData); // 중복 배열 방지
    }

    return {
      userEquipData: equipList, // 이중 배열 없이 반환
    };
  }

  async rewardCurrency(
    user_id: string,
    item_name: string,
    qty: number,
    qr: QueryRunner,
  ) {
    const usersRepository = this.usersService.getUsersRepository(qr);

    const userData = await usersRepository.findOne({
      where: { user_id },
    });

    if (!userData) {
      throw new NotFoundException(`User ${user_id} not found.`);
    }

    // 아이템 필드 매핑
    const fieldMap: Record<string, keyof typeof userData> = {
      secame_credit: 'secame_credit',
      gord: 'gord',
      diamond_paid: 'diamond_paid',
      diamond_free: 'diamond_free',
      exp: 'exp',
      battery: 'battery',
      revive_coin: 'revive_coin',
    };

    if (!(item_name in fieldMap)) {
      throw new BadRequestException(`Invalid currency type: ${item_name}`);
    }

    const field = fieldMap[item_name] as keyof typeof userData;

    // 타입 단언하여 숫자로 처리
    (userData[field] as number) += qty;

    // 업데이트된 데이터 저장
    await usersRepository.save(userData);

    return [{ item_name, item_count: qty }];
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
    console.log('equip_level_id', equip_level_id);

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

      // const newEquip = await queryRunner.query(
      //   `SELECT * FROM user_equip WHERE id = LAST_INSERT_ID()`,
      // );
      const newEquip = await queryRunner.query(
        `SELECT * FROM user_equip WHERE id = LAST_INSERT_ID() AND user_id = ?`,
        [user_id],
      );

      // 배열에서 첫 번째 요소만 반환
      return newEquip.length > 0 ? newEquip[0] : null;

      // 사용자 장비 목록 조회
      // const userEquipList = await queryRunner.query(
      //   `SELECT * FROM user_equip WHERE user_id = ?`,
      //   [user_id],
      // );

      //return newEquip;
    } catch (error) {
      console.error('🔥 Error in createEquipQuery:', error); // 에러 메시지 출력
      console.error(
        '🔥 QueryRunner:',
        qr ? 'Using existing QueryRunner' : 'Created new QueryRunner',
      );

      throw new InternalServerErrorException('Failed to create equip', error);
    } finally {
      if (!qr) await queryRunner.release(); // 사용한 QueryRunner 해제
    }
  }
}
