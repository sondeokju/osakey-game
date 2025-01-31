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

  @Get('list')
  @UseInterceptors(TransactionInterceptor)
  async equipList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userEquipService.equipList(user.user_id, qr);
    return result;
  }

  @Post('/skill/random')
  @UseInterceptors(TransactionInterceptor)
  async equipSkillRandomMount(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    console.log('user_equip_id', user_equip_id);
    const result = await this.userEquipService.equipSkillRandomMount(
      user.user_id,
      user_equip_id,
      qr,
    );

    return result;
  }

  @Post('/level/reset')
  @UseInterceptors(TransactionInterceptor)
  async equipLevelReset(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    console.log('user_equip_id', user_equip_id);
    const result = await this.userEquipService.equipLevelReset(
      user.user_id,
      user_equip_id,
      qr,
    );

    return result;
  }

  @Post('mount')
  @UseInterceptors(TransactionInterceptor)
  async equipMount(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEquipService.equipMount(
      user.user_id,
      user_equip_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('level-up')
  @UseInterceptors(TransactionInterceptor)
  async equipLevelUp(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    console.log('user_equip_id', user_equip_id);
    const result = await this.userEquipService.equipLevelUp(
      user.user_id,
      user_equip_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('max/level-up')
  @UseInterceptors(TransactionInterceptor)
  async equipMaxLevelUp(
    @User() user: Users,
    @Body('user_equip_id') user_equip_id: number,
    @QueryRunner() qr: QR,
  ) {
    console.log('user_equip_id', user_equip_id);
    const result = await this.userEquipService.equipMaxLevelUp(
      user.user_id,
      user_equip_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('find/best')
  @UseInterceptors(TransactionInterceptor)
  async findBestEquip(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userEquipService.findBestEquip(user.user_id, qr);

    return JSON.stringify(result);
  }

  @Post('fusion')
  @UseInterceptors(TransactionInterceptor)
  async equipFusion(
    @User() user: Users,
    @Body('user_equip_id_01') user_equip_id_01: number,
    @Body('user_equip_id_02') user_equip_id_02: number,
    @Body('user_equip_id_03') user_equip_id_03: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEquipService.equipFusion(
      user.user_id,
      +user_equip_id_01,
      +user_equip_id_02,
      +user_equip_id_03,
      qr,
    );

    return JSON.stringify(result);
  }
}
