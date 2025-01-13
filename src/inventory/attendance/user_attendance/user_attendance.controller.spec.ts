import { Test, TestingModule } from '@nestjs/testing';
import { UserAttendanceController } from './user_attendance.controller';
import { UserAttendanceService } from './user_attendance.service';

describe('UserAttendanceController', () => {
  let controller: UserAttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAttendanceController],
      providers: [UserAttendanceService],
    }).compile();

    controller = module.get<UserAttendanceController>(UserAttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
