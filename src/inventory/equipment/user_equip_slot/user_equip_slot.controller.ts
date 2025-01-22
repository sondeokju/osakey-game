import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserEquipSlotService } from './user_equip_slot.service';

@Controller('equip-slot')
export class UserEquipSlotController {
  constructor(private readonly userEquipSlotService: UserEquipSlotService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async getEquipSlot(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userEquipSlotService.getEquipSlot(user.user_id, qr);
    return result;
  }

  @Post('reset')
  @UseInterceptors(TransactionInterceptor)
  async findBestEquip(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userEquipSlotService.equipSlotReset(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('release')
  @UseInterceptors(TransactionInterceptor)
  async equipSlotRelease(
    @User() user: Users,
    @Body('acc') acc: number,
    @Body('engine') engine: number,
    @Body('armor') armor: number,
    @Body('boost') boost: number,
    @Body('shoes') shoes: number,
    @Body('weapon') weapon: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEquipSlotService.equipSlotRelease(
      user.user_id,
      acc,
      engine,
      armor,
      boost,
      shoes,
      weapon,
      qr,
    );

    return result;
  }
}
