import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { ItemService } from 'src/static-table/item/item.service';

@Injectable()
export class RewardOfferService {
  constructor(
    private readonly rewardService: RewardService,
    private readonly usersService: UsersService,
    private readonly itemService: ItemService,
    private readonly userItemService: UserItemService,
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

      if (itemData.item_type == 'C') {
        await this.rewardCurrency(
          user_id,
          itemData.item_name,
          reward.item_count,
          qr,
        );
      }

      if (['M'].includes(itemData.item_type)) {
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
      //await this.userEquipService.createEquip(user_id, item_id, qr);
    } else if (['C'].includes(itemData.item_type)) {
      //await this.rewardCurrency(user_id, itemData.item_type, qty, qr);
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
      } else if (itemData.item_type === 'E') {
        // for (let i = 0; i < qty; i++) {
        //   await this.userEquipService.createEquip(user_id, item_id, qr);
        // }
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

    for (const { equip_id } of equips) {
      //await this.userEquipService.createEquip(user_id, equip_id, qr);

      //const equipData = await this.equipService.getEquip(equip_id, qr);

      result.push({
        equip_id,
        // origin_equip_id: equipData.origin_equip_id,
        // equip_enum: equipData.equip_enum,
        // equip_name: equipData.equip_name,
        // equip_slot: equipData.equip_slot,
        // equip_grade: equipData.equip_grade,
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
}
