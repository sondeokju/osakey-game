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
import { UsersModel } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';

@Controller('user-equipment')
export class UserEquipmentController {
  constructor(private readonly userEquipmentService: UserEquipmentService) {}

  @Get('/all')
  async getUserEquipmentAll(
    @User() user: UsersModel,
    //@Param('user_id') user_id: string,
  ) {
    const result = await this.userEquipmentService.getUserEquipmentAll(user.id);

    return JSON.stringify(result);
  }

  @Post(':equipment_id')
  @UseInterceptors(TransactionInterceptor)
  async patchCreateEquipment(
    @User() user: UsersModel,
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
    @User() user: UsersModel,
    @Param('id', ParseIntPipe) id: number,
    @QueryRunner() qr: QR,
  ) {
    await this.userEquipmentService.deleteEquipment(id, qr);

    return true;
  }

  // @Get('/gacha')
  // @UseInterceptors(TransactionInterceptor)
  // async gachaSelectEquipment(@User() user: UsersModel) {
  //   console.log('gachaGet');
  //   const result = await this.userEquipmentService.equipmentRandom(user.id);

  //   return JSON.stringify(result);
  // }

  // @Post('/gachaPost')
  // @UseInterceptors(TransactionInterceptor)
  // async gachaSelectEquipmentPost(
  //   @User() user: UsersModel,
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
    @User() user: UsersModel,
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
