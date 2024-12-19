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
import { UserEquipOptionService } from './user_equip_option.service';

@Controller('equip-option')
export class UserEquipOptionController {
  constructor(
    private readonly userEquipOptionService: UserEquipOptionService,
  ) {}

  @Get('list')
  @UseInterceptors(TransactionInterceptor)
  async equipOptionList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userEquipOptionService.equipOptionList(
      user.user_id,
      qr,
    );
    return result;
  }
}
