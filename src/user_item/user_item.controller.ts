import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { UserItemService } from './user_item.service';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { User } from 'src/users/decorator/user.decorator';
import { Users } from 'src/users/entity/users.entity';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';

@Controller('user-item')
export class UserItemController {
  constructor(private readonly userItemService: UserItemService) {}

  @Post('/all')
  @UseInterceptors(TransactionInterceptor)
  async getUserItemtAll(
    @User() user: Users,
    //@Param('user_id') user_id: string,
    @QueryRunner() qr: QR,
  ) {    
    const result = await this.userItemService.getUserItemAll(user.user_id, qr);

    return JSON.stringify(result);
  }

  @Post(':item_id/:item_count')
  @UseInterceptors(TransactionInterceptor)
  async createItem(
    @User() user: Users,
    @Param('item_id', ParseIntPipe) item_id: number,
    @Param('item_count', ParseIntPipe) item_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userItemService.createItem(
      user.user_id,
      item_id,
      item_count,
      qr,
    );

    return JSON.stringify(result);
  }

  @Delete(':id')
  @UseInterceptors(TransactionInterceptor)
  async deleteItem(
    @User() user: Users,
    @Param('id', ParseIntPipe) id: number,
    @QueryRunner() qr: QR,
  ) {
    await this.userItemService.deleteItem(id, qr);

    return true;
  }

  @Patch('/:id/:item_count')
  @UseInterceptors(TransactionInterceptor)
  async patchEquipmentSlot(
    @User() user: Users,
    @Param('id', ParseIntPipe) id: number,
    @Param('item_count', ParseIntPipe) item_count: number,
    @QueryRunner() qr: QR,
  ) {
    await this.userItemService.patchItem(id, item_count, qr);

    return true;
  }
}
