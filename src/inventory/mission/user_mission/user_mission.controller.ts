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

  @Post('delete')
  @UseInterceptors(TransactionInterceptor)
  async deleteMission(
    @User() user: Users,
    @Body('user_mission_id') user_mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    console.log('user_mission_id', user_mission_id);
    const result = await this.userMissionService.deleteMission(
      user.user_id,
      user_mission_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async saveMssion(
    @User() user: Users,
    @Body('mission_id') mission_id: number,
    @Body('mission_kind') mission_kind: string,
    @Body('mission_goal') mission_goal: number,
    @Body('clear_count') clear_count: number,
    @Body('reward_id') reward_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMissionService.saveMssion(
      user.user_id,
      mission_id,
      mission_goal,
      mission_kind,
      clear_count,
      reward_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async missionList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userMissionService.missionList(user.user_id, qr);
    return result;
  }

  @Post('reward')
  @UseInterceptors(TransactionInterceptor)
  async missionReward(
    @User() user: Users,
    @Body('user_mission_id') user_mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMissionService.missionReward(
      user.user_id,
      user_mission_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('try')
  @UseInterceptors(TransactionInterceptor)
  async missionTry(
    @User() user: Users,
    @Body('mission_id') mission_id: number,
    @Body('mission_try_yn') mission_try_yn: string,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userMissionService.missionTry(
      user.user_id,
      mission_id,
      mission_try_yn,
      qr,
    );

    return JSON.stringify(result);
  }
}
