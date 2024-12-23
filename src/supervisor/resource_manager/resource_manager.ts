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
    equipLevel: EquipLevel,
    qr: QueryRunner,
  ) {
    // 유저의 현재 보유 고드 확인
    const userCurrency = await this.usersService.getUserMoney(user_id, qr);
    const requiredGold = equipLevel.require_gold;
    console.log('requiredGold', requiredGold);

    if (requiredGold > userCurrency.gord) {
      throw new BadRequestException('Not enough gord.');
    }

    // 레벨업에 필요한 아이템 확인
    const requiredItemId = equipLevel.require_item_id;
    const requiredItemCount = equipLevel.require_item_count;

    if (requiredItemId && requiredItemCount) {
      const userItemData = await this.userItemService.getItem(
        requiredItemId,
        qr,
      );

      if (!userItemData || requiredItemCount > userItemData.item_count) {
        throw new BadRequestException('Not enough items.');
      }

      // 아이템 차감
      await this.userItemService.reduceItem(
        user_id,
        requiredItemId,
        requiredItemCount,
        qr,
      );
    }

    // 고드 차감
    await this.usersService.reduceGord(user_id, requiredGold, qr);
  }
}
