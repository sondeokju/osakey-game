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
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { UsersModel } from 'src/users/entity/users.entity';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  // @Get('all')
  // @UseInterceptors(TransactionInterceptor)
  // async getUserBase(@User() user: UsersModel, @QueryRunner() qr: QR) {
  //   const result = await this.missionService.getMissionAll(qr);
  //   return JSON.stringify(result);
  // }
}
