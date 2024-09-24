import { Test, TestingModule } from '@nestjs/testing';
import { MissionRoutineBonusService } from './mission_routine_bonus.service';

describe('MissionRoutineBonusService', () => {
  let service: MissionRoutineBonusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionRoutineBonusService],
    }).compile();

    service = module.get<MissionRoutineBonusService>(MissionRoutineBonusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
