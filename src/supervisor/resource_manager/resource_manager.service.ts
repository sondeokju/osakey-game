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
      dia?: { amount: number; mode: 'free' | 'paid' | 'mixed' };
      exp?: number;
      battery?: number;
      secame_credit?: number;
    },
    qr?: QueryRunner,
  ) {
    const usersRepository = this.usersService.getUsersRepository(qr);

    // 1️⃣ 트랜잭션 시작 (외부에서 주어진 qr이 없을 경우 생성)
    const isExternalTransaction = !!qr;
    if (!isExternalTransaction) {
      qr = usersRepository.manager.connection.createQueryRunner();
      await qr.startTransaction();
    }

    try {
      const userCurrency = await this.usersService.getUserMoney(user_id, qr);

      // 🔹 1️⃣ 아이템 체크
      if (resources.item?.count && resources.item.count > 0) {
        const userItemData = await this.userItemService.getItem(
          user_id,
          resources.item.item_id,
          qr,
        );
        if (resources.item.count > userItemData.item_count) {
          throw new BadRequestException('Not enough items.');
        }
      }

      // 🔹 2️⃣ 고드(Gord) 차감
      if (resources.gord) {
        if (resources.gord <= 0) {
          throw new BadRequestException('Invalid gord amount.');
        }
        if (resources.gord > userCurrency.gord) {
          throw new BadRequestException('Not enough gord.');
        }
        await this.usersService.reduceGord(user_id, resources.gord, qr);
      }

      // 🔹 3️⃣ 아이템 차감
      if (resources.item?.count && resources.item.count > 0) {
        await this.userItemService.reduceItem(
          user_id,
          resources.item.item_id,
          resources.item.count,
          qr,
        );
      }

      // 🔹 4️⃣ 다이아몬드 차감 (mode: free | paid | mixed)
      if (resources.dia?.amount && resources.dia.amount > 0) {
        await this.usersService.deductDiamonds(
          user_id,
          resources.dia.amount,
          resources.dia.mode,
          qr,
        );
      }

      // 🔹 5️⃣ 경험치 차감
      if (resources.exp) {
        if (resources.exp <= 0) {
          throw new BadRequestException('Invalid exp amount.');
        }
        if (resources.exp > userCurrency.exp) {
          throw new BadRequestException('Not enough exp.');
        }
        await this.usersService.addExp(user_id, resources.exp, qr);
      }

      // 🔹 6️⃣ 세카메 크레딧 차감
      if (resources.secame_credit) {
        if (resources.secame_credit <= 0) {
          throw new BadRequestException('Invalid secame credit amount.');
        }
        await this.usersService.secameCreditDeduct(
          user_id,
          resources.secame_credit,
          qr,
        );
      }

      // 7️⃣ 트랜잭션 커밋
      if (!isExternalTransaction) {
        await qr.commitTransaction();
      }
    } catch (error) {
      if (!isExternalTransaction) {
        await qr.rollbackTransaction();
      }
      throw error;
    } finally {
      if (!isExternalTransaction) {
        await qr.release();
      }
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
