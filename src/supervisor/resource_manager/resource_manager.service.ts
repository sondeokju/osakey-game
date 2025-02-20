import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
      dia?: { amount: number; mode: 'free' | 'paid' | 'mixed' };
      exp?: number;
      battery?: number;
      secame_credit?: number;
    },
    qr: QueryRunner, // 무조건 QueryRunner를 받아야 함
  ) {
    if (!qr) {
      throw new InternalServerErrorException('QueryRunner is required.');
    }

    try {
      const userCurrency = await this.usersService.getUserMoney(user_id, qr);

      // ✅ 차감 실패 시 반환할 에러 메시지 및 코드 변수
      let errorMessage = '';
      let errorCode = '';

      // 🔹 아이템 차감
      if (resources.item?.count && resources.item.count > 0) {
        const userItemData = await this.userItemService.getItem(
          user_id,
          resources.item.item_id,
          qr,
        );
        if (!userItemData || resources.item.count > userItemData.item_count) {
          errorCode = 'INSUFFICIENT_ITEM';
          errorMessage = 'Not enough items.';
        } else {
          await this.userItemService.reduceItem(
            user_id,
            resources.item.item_id,
            resources.item.count,
            qr,
          );
        }
      }

      // 🔹 고드(Gord) 차감
      if (resources.gord) {
        if (resources.gord <= 0 || resources.gord > userCurrency.gord) {
          errorCode = 'INSUFFICIENT_GORD';
          errorMessage = 'Not enough Gord.';
        } else {
          await this.usersService.reduceGord(user_id, resources.gord, qr);
        }
      }

      // 🔹 다이아몬드 차감
      if (resources.dia?.amount && resources.dia.amount > 0) {
        const userDiaBalance = await this.usersService.getMe(user_id, qr);
        if (
          resources.dia.mode === 'paid' &&
          resources.dia.amount > userDiaBalance.diamond_paid
        ) {
          errorCode = 'INSUFFICIENT_DIA_PAID';
          errorMessage = 'Not enough paid diamonds.';
        } else if (
          resources.dia.mode === 'mixed' &&
          resources.dia.amount >
            userDiaBalance.diamond_paid + userDiaBalance.diamond_free
        ) {
          errorCode = 'INSUFFICIENT_DIA_MIXED';
          errorMessage = 'Not enough mixed diamonds.';
        } else {
          await this.usersService.deductDiamonds(
            user_id,
            resources.dia.amount,
            resources.dia.mode,
            qr,
          );
        }
      }

      // 🔹 경험치 차감
      if (resources.exp && resources.exp > 0) {
        if (resources.exp > userCurrency.exp) {
          errorCode = 'INSUFFICIENT_EXP';
          errorMessage = 'Not enough EXP.';
        } else {
          await this.usersService.addExp(user_id, resources.exp, qr);
        }
      }

      // 🔹 세카메 크레딧 차감
      if (resources.secame_credit && resources.secame_credit > 0) {
        if (resources.secame_credit > userCurrency.secame_credit) {
          errorCode = 'INSUFFICIENT_SECAME_CREDIT';
          errorMessage = 'Not enough Secame Credit.';
        } else {
          await this.usersService.secameCreditDeduct(
            user_id,
            resources.secame_credit,
            qr,
          );
        }
      }

      // ✅ 차감할 자원이 부족하면 오류 반환
      if (errorMessage) {
        return {
          success: false,
          errorCode,
          message: errorMessage,
        };
      }

      return { success: true };
    } catch (error) {
      console.error('❌ Error in validateAndDeductResources:', error.message);
      return {
        success: false,
        errorCode: 'RESOURCE_DEDUCTION_FAILED',
        message: 'Failed to validate and deduct resources.',
      };
    }
  }

  async validateAndAddResources(
    user_id: string,
    resources: {
      gord?: number;
      item?: { item_id: number; count: number };
      dia?: number;
      exp?: number;
      battery?: number;
      seca_coin?: number;
    },
    qr: QueryRunner,
  ) {
    //const userCurrency = await this.usersService.getUserMoney(user_id, qr);

    console.log('resources.gord', resources.gord);
    // 1. 고드 추가
    if (resources.gord) {
      await this.usersService.addGord(user_id, resources.gord, qr);
    }

    // 2. 아이템 추가
    if (resources.item) {
      await this.userItemService.addItem(
        user_id,
        resources.item.item_id,
        resources.item.count,
        qr,
      );
    }

    // 3. 다이아몬드 추가
    if (resources.dia) {
      await this.usersService.addDia(user_id, resources.dia, qr);
    }

    // 4. 경험치 추가
    if (resources.exp) {
      await this.usersService.addExp(user_id, resources.exp, qr);
    }

    // 5. 배터리 추가
    if (resources.battery) {
      await this.usersService.addBattery(user_id, resources.battery, qr);
    }

    // 6. 코인 추가
    if (resources.seca_coin) {
      await this.usersService.addSecaCoin(user_id, resources.seca_coin, qr);
    }
  }

  async validateResources(
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
    // 1. 고드 체크
    if (resources.gord) {
      if (resources.gord > userCurrency.gord) {
        return false;
      }
    }

    // 2. 아이템 체크
    if (resources.item) {
      const { item_id, count } = resources.item;
      if (item_id && count) {
        const userItemData = await this.userItemService.getItem(
          user_id,
          item_id,
          qr,
        );
        if (!userItemData || count > userItemData.item_count) {
          return false;
        }
      }
    }

    return true;
  }
}
