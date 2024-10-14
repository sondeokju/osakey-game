import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { UsersService } from 'src/users/users.service';
import { ItemService } from '../item/item.service';
import { UserItemService } from 'src/user_item/user_item.service';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
    //private readonly usersService: UsersService,
    private readonly itemService: ItemService,
    private readonly userItemService: UserItemService,
  ) {}

  getRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Reward>(Reward)
      : this.rewardRepository;
  }

  async getReward(reward_id: number, qr?: QueryRunner) {
    const rewardRepository = this.getRewardRepository(qr);
    const result = await rewardRepository.find({
      where: {
        reward_id,
      },
    });

    return result;
  }

  async reward(user_id: number, reward_id: number, qr?: QueryRunner) {
    const rewardData = await this.getReward(reward_id);

    let result = [];

    for (const reward of rewardData) {
      let obj = {};

      Object.entries(reward).forEach(([key, value]) => {
        obj[`${key}`] = `${value}`;
      });

      const itemData = await this.itemService.getItem(+obj['item_id']);

      if (itemData.item_type == 'currency') {
        //await this.rewardCurrency(id, itemData.item_type, reward.item_qty, qr);
      }

      if (['material', 'equipment'].includes(itemData.item_type)) {
        await this.userItemService.rewardItem(
          user_id,
          itemData.item_id,
          itemData.item_grade,
          itemData.item_type,
          reward.item_qty,
          qr,
        );
      }

      obj['item_id'] = itemData.item_id;
      obj['item_type'] = itemData.item_type;
      obj['item_name'] = itemData.item_name;

      result.push(obj);
    }

    return result;
  }

  // async rewardCurrency(
  //   user_id: number,
  //   item_name: string,
  //   qty: number,
  //   qr?: QueryRunner,
  // ) {
  //   const usersRepository = this.usersService.getUsersRepository(qr);
  //   const userData = await usersRepository.findOne({
  //     where: {
  //       id: user_id,
  //     },
  //   });

  //   if (!userData) {
  //     throw new Error('User not found');
  //   }

  //   const updatedData = { ...userData };

  //   switch (item_name) {
  //     case 'seca_coin':
  //       updatedData.seca_coin = qty;
  //       break;
  //     case 'gord':
  //       updatedData.gord = qty;
  //       break;
  //     case 'diamond_paid':
  //       updatedData.diamond_free = qty;
  //       break;
  //     case 'diamond_free':
  //       updatedData.gord = qty;
  //       break;
  //     case 'exp':
  //       updatedData.gord = qty;
  //       break;
  //     case 'battery':
  //       updatedData.gord = qty;
  //       break;
  //     case 'revive_coin':
  //       updatedData.gord = qty;
  //       break;
  //     // default:
  //     //   response = 'Unknown item type.';
  //     //   break;
  //   }

  //   await usersRepository.save(updatedData);

  //   return true;
  // }
}
