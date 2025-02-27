import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';

@Controller('rentama')
export class UserRentamaEquipSlotController {
  constructor(
    private readonly userRentamaEquipSlotService: UserRentamaEquipSlotService,
  ) {}

  // @Get()
  // @UseInterceptors(TransactionInterceptor)
  // async getUserDispatchRentama(@User() user: Users, @QueryRunner() qr: QR) {
  //   const result = this.userDispatchRentamaService.getUserDispatchRentama(
  //     user.user_id,
  //     qr,
  //   );
  //   return result;
  // }

  // 장비 강화
  @Post('equip/level-up')
  @UseInterceptors(TransactionInterceptor)
  async equipBoost(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userRentamaEquipSlotService.equipBoost(
      user.user_id,
      user_equip_id,
      qr,
    );

    return result;
  }

  // 장비 자동 착용
  @Post('auto/equip')
  @UseInterceptors(TransactionInterceptor)
  async autoEquipGear(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userRentamaEquipSlotService.autoEquip(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }

  // 장비 교체
  @Post('equip/change')
  @UseInterceptors(TransactionInterceptor)
  async rentamaEquipSlotChange(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result =
      await this.userRentamaEquipSlotService.rentamaEquipSlotChange(
        user.user_id,
        user_equip_id,
        qr,
      );

    return result;
  }
}
