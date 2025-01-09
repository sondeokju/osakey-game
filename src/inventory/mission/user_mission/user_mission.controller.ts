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
    @Body('mission_id') mission_id: number,
    @Body('mission_kind') mission_kind: string,
    @Body('mission_goal') mission_goal: number,
    @Body('clear_count') clear_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMissionService.saveMssion(
      user.user_id,
      mission_id,
      mission_goal,
      mission_kind,
      clear_count,
      qr,
    );

    return JSON.stringify(result);
  }
}
