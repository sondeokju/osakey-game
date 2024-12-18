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
import { UserEquipService } from './user_equip.service';

@Controller('equip')
export class UserEquipController {
  constructor(private readonly userEquipService: UserEquipService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async equipList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userEquipService.equipList(user.user_id, qr);
    return result;
  }

  @Post('mount')
  @UseInterceptors(TransactionInterceptor)
  async equipMount(
    @User() user: Users,
    @Body('equip_id') equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    console.log(equip_id);
    const result = await this.userEquipService.equipMount(
      user.user_id,
      equip_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
