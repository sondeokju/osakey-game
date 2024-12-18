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
}
