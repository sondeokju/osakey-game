import { Test, TestingModule } from '@nestjs/testing';
import { UserEventAttendanceController } from './user_event_attendance.controller';
import { UserEventAttendanceService } from './user_event_attendance.service';

describe('UserEventAttendanceController', () => {
  let controller: UserEventAttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEventAttendanceController],
      providers: [UserEventAttendanceService],
    }).compile();

    controller = module.get<UserEventAttendanceController>(UserEventAttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
