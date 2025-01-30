import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserMissionService } from 'src/inventory/mission/user_mission/user_mission.service';
import { QueryRunner } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(private readonly userMissionService: UserMissionService) {}

  async userSetting(user_id: string, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    this.userMissionService.insertMission(user_id, 12101001, qr);
  }

  private async initializeAttendance(
    user_id: string,
    qr: QueryRunner,
    repository,
  ) {
    const attendanceData = await this.fetchAttendanceData(1, 1, qr);
    const userAttendance = {
      user_id,
      board_num: attendanceData.board_num,
      day: attendanceData.day,
      reward_id: attendanceData.reward_id,
    };
    return userAttendance;
  }
}
