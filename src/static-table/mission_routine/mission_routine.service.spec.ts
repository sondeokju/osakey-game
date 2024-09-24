import { Test, TestingModule } from '@nestjs/testing';
import { MissionRoutineService } from './mission_routine.service';

describe('MissionRoutineService', () => {
  let service: MissionRoutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionRoutineService],
    }).compile();

    service = module.get<MissionRoutineService>(MissionRoutineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
