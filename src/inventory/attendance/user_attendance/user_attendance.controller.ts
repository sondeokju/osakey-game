import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserAttendanceService } from './user_attendance.service';

@Controller('attendance')
export class UserAttendanceController {
  constructor(private readonly userAttendanceService: UserAttendanceService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async attendance(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userAttendanceService.attendance(user.user_id, qr);
    return result;
  }

  @Post('check')
  @UseInterceptors(TransactionInterceptor)
  async saveMssion(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userAttendanceService.saveAttendance(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
