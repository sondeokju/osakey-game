import { Injectable, BadRequestException } from '@nestjs/common';
import { EquipLevel } from 'src/static-table/equipment/equip_level/entities/equip_level.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { UsersService } from 'src/users/users.service';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ResourceManagerService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userItemService: UserItemService,
  ) {}
  async validateAndDeductResources(
    user_id: string,
    resources: {
      gord?: number;
      item?: { item_id: number; count: number };
      dia?: number;
      exp?: number;
      battery?: number;
      coin?: number;
    },
    qr: QueryRunner,
  ) {
    const userCurrency = await this.usersService.getUserMoney(user_id, qr);
    // 1. 고드 차감
    if (resources.gord) {
      if (resources.gord > userCurrency.gord) {
        throw new BadRequestException('Not enough gord.');
      }
      await this.usersService.reduceGord(user_id, resources.gord, qr);
    }

    // 2. 아이템 차감
    if (resources.item) {
      const { item_id, count } = resources.item;
      if (id && count) {
        const userItemData = await this.userItemService.getItem(item_id, qr);
        if (!userItemData || count > userItemData.item_count) {
          throw new BadRequestException('Not enough items.');
        }
        await this.userItemService.reduceItem(user_id, item_id, count, qr);
      }
    }

    // 3. 다이아몬드 차감
    // if (resources.dia) {
    //   if (resources.dia > userCurrency.dia) {
    //     throw new BadRequestException('Not enough dia.');
    //   }
    //   await this.usersService.reduceDia(user_id, resources.dia, qr);
    // }

    // 4. 경험치 차감
    // if (resources.exp) {
    //   if (resources.exp > userExp) {
    //     throw new BadRequestException('Not enough experience points.');
    //   }
    //   await this.usersService.reduceExp(user_id, resources.exp, qr);
    // }

    // 5. 배터리 차감
    // if (resources.battery) {
    //   if (resources.battery > userBattery) {
    //     throw new BadRequestException('Not enough battery.');
    //   }
    //   await this.usersService.reduceBattery(user_id, resources.battery, qr);
    // }

    // 6. 코인 차감
    // if (resources.coin) {
    //   if (resources.coin > userCoin) {
    //     throw new BadRequestException('Not enough coins.');
    //   }
    //   await this.usersService.reduceCoin(user_id, resources.coin, qr);
    // }
  }
}
