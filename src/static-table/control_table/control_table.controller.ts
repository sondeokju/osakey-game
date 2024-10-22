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
import { ControlTableService } from './control_table.service';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('control-table')
export class ControlTableController {
  constructor(private readonly controlTableService: ControlTableService) {}

  @Get('/all')
  @UseInterceptors(TransactionInterceptor)
  async getControlTableAll(@QueryRunner() qr: QR) {
    const result = await this.controlTableService.getControlTableAll(qr);
    return JSON.stringify(result);
  }

  // @Get('/mission/all')
  // @UseInterceptors(TransactionInterceptor)
  // async getMissionTableAll(@QueryRunner() qr: QR) {
  //   const result = await this.controlTableService.getMissionTableAll(qr);
  //   return JSON.stringify(result);
  // }
}
