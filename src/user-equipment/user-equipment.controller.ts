import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { UserEquipmentService } from './user-equipment.service';
import { Users } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';

@Controller('user-equipment')
export class UserEquipmentController {
  constructor(private readonly userEquipmentService: UserEquipmentService) {}

  @Post('/all')
  async getUserEquipmentAll(
    @User() user: Users,
    //@Param('user_id') user_id: string,
  ) {
    const result = await this.userEquipmentService.getUserEquipmentAll(user.id);

    return JSON.stringify(result);
  }

  @Post(':equipment_id')
  @UseInterceptors(TransactionInterceptor)
  async patchCreateEquipment(
    @User() user: Users,
    @Param('equipment_id', ParseIntPipe) equipment_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEquipmentService.createEquipment(
      user.id,
      equipment_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Delete(':id')
  @UseInterceptors(TransactionInterceptor)
  async deleteEquipment(
    @User() user: Users,
    @Param('id', ParseIntPipe) id: number,
    @QueryRunner() qr: QR,
  ) {
    await this.userEquipmentService.deleteEquipment(id, qr);

    return true;
  }

  // @Get('/gacha')
  // @UseInterceptors(TransactionInterceptor)
  // async gachaSelectEquipment(@User() user: Users) {
  //   console.log('gachaGet');
  //   const result = await this.userEquipmentService.equipmentRandom(user.id);

  //   return JSON.stringify(result);
  // }

  // @Post('/gachaPost')
  // @UseInterceptors(TransactionInterceptor)
  // async gachaSelectEquipmentPost(
  //   @User() user: Users,
  //   @Param('gacha', ParseIntPipe) gacha: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   console.log('gachaPost');
  //   const result = await this.userEquipmentService.equipmentRandom(user.id);

  //   return JSON.stringify(result);
  // }

  @Post('/gacha/:rand_cnt')
  @UseInterceptors(TransactionInterceptor)
  async gachaEquipment(
    @User() user: Users,
    @Param('rand_cnt', ParseIntPipe) rand_cnt: number,
    //@QueryRunner() qr: QR,
  ) {
    console.log('gacha rand_cnt');
    const result = await this.userEquipmentService.equipmentRandom(
      user.id,
      rand_cnt,
    );

    return JSON.stringify(result);
  }
}
