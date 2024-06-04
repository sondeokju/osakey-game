import { Module } from '@nestjs/common';
import { UserEventAttendanceService } from './user_event_attendance.service';
import { UserEventAttendanceController } from './user_event_attendance.controller';

@Module({
  controllers: [UserEventAttendanceController],
  providers: [UserEventAttendanceService],
})
export class UserEventAttendanceModule {}
