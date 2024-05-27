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
import { UserEquipmentSlotService } from './user-equipment-slot.service';
import { UsersModel } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';

@Controller('user-equipment-slot')
export class UserEquipmentSlotController {
  constructor(
    private readonly userEquipmentSlotService: UserEquipmentSlotService,
  ) {}

  @Get('/info')
  async findOne(@User() user: UsersModel) {
    const result = await this.userEquipmentSlotService.getUserEquipmentSlot(
      user.id,
    );

    return JSON.stringify(result);
  }

  @Post('/createequip')
  @UseInterceptors(TransactionInterceptor)
  async CreateEquipmentSlot(
    @User() user: UsersModel,
    //@Param('equipment_id', ParseIntPipe) equipment_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userEquipmentSlotService.createEquipmentSlot(
      user.id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Patch('/:user_equipment_id')
  @UseInterceptors(TransactionInterceptor)
  async patchEquipmentSlot(
    @User() user: UsersModel,
    //@Param('equipslot_id', ParseIntPipe) equipslot_id: number,
    @Param('user_equipment_id', ParseIntPipe) user_equipment_id: number,
    @QueryRunner() qr: QR,
  ) {
    await this.userEquipmentSlotService.patchEquipSlot(
      user.id,
      user_equipment_id,
      qr,
    );

    return true;
  }
}
