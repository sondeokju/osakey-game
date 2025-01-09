import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserMissionService } from './user_mission.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('mission')
export class UserMissionController {
  constructor(private readonly userMissionService: UserMissionService) {}

  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async equipFusion(
    @User() user: Users,
    @Body('mission_id') user_equip_id_01: number,
    @Body('mission_kind') user_equip_id_02: number,
    @Body('mission_goal') user_equip_id_03: number,
    @Body('mission_clear_count') mission_clear_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMissionService.saveMssion(
      user.user_id,
      user_equip_id_01,
      user_equip_id_02,
      user_equip_id_03,
      qr,
    );

    return JSON.stringify(result);
  }
}
