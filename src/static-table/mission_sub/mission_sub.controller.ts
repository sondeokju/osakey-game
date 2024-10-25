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
import { MissionSubService } from './mission_sub.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { Users } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/user.decorator';

@Controller('missionsub')
export class MissionSubController {
  constructor(private readonly missionSubService: MissionSubService) {}

  @Post(':mission_sub_id')
  @UseInterceptors(TransactionInterceptor)
  async getUserBase(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.missionSubService.getMissionSub(user.id, qr);
    return JSON.stringify(result);
  }
}
