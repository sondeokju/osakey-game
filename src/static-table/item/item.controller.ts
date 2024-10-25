import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/all')
  @UseInterceptors(TransactionInterceptor)
  async getItemAll(@QueryRunner() qr: QR) {
    const result = await this.itemService.getItemAll(qr);
    return JSON.stringify(result);
  }
}
