import { Test, TestingModule } from '@nestjs/testing';
import { UserEventAttendanceService } from './user_event_attendance.service';

describe('UserEventAttendanceService', () => {
  let service: UserEventAttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEventAttendanceService],
    }).compile();

    service = module.get<UserEventAttendanceService>(UserEventAttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
