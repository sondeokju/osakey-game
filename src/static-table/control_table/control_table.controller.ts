import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { ControlTableService } from './control_table.service';

import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('control-table')
export class ControlTableController {
  constructor(private readonly controlTableService: ControlTableService) {}

  @Post('/all')
  @UseInterceptors(TransactionInterceptor)
  async getControlTableAll(@QueryRunner() qr: QR) {
    const result = await this.controlTableService.getControlTableAll(qr);
    return JSON.stringify(result);
  }
  @Post('/01')
  @UseInterceptors(TransactionInterceptor)
  async getAll01(@QueryRunner() qr: QR) {
    const result =
      await this.controlTableService.getControlTableWithCacheAll(qr);
    return JSON.stringify(result);
  }

  @Post('/02')
  @UseInterceptors(TransactionInterceptor)
  async getAll02(@QueryRunner() qr: QR) {
    const result = await this.controlTableService.getControlTableAll(qr);
    return JSON.stringify(result);
  }

  @Post('/03')
  @UseInterceptors(TransactionInterceptor)
  async getAll03(@QueryRunner() qr: QR) {
    const result = await this.controlTableService.getControlTableAll(qr);
    return JSON.stringify(result);
  }

  @Post('/04')
  @UseInterceptors(TransactionInterceptor)
  async getAll04(@QueryRunner() qr: QR) {
    const result = await this.controlTableService.getControlTableAll(qr);
    return JSON.stringify(result);
  }

  @Post('/05')
  @UseInterceptors(TransactionInterceptor)
  async getAll05(@QueryRunner() qr: QR) {
    const result = await this.controlTableService.getControlTableAll(qr);
    return JSON.stringify(result);
  }
}
