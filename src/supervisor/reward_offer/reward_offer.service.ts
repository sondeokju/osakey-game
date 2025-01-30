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

    console.log('-------- rewardItem ---------');
    console.log('item_id', item_id);
    console.log('qty', qty);
    console.log('itemData', itemData);
    console.log('-------- rewardItem ---------');

    if (itemData.item_type == 'C') {
      await this.rewardCurrency(user_id, itemData.item_name, qty, qr);
    }

    if (['M'].includes(itemData.item_type)) {
      await this.userItemService.rewardItem(
        user_id,
        itemData.item_id,
        itemData.item_grade,
        itemData.item_type,
        qty,
        qr,
      );
    }

    // if (['C'].includes(itemData.item_type)) {
    //   await this.rewardCurrency(user_id, itemData.item_type, qty, qr);
    // }

    obj['item_id'] = itemData.item_id;
    obj['item_type'] = itemData.item_type;
    obj['item_name'] = itemData.item_name;

    result.push(obj);

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
}
