import { Test, TestingModule } from '@nestjs/testing';
import { MissionRoutinebonusIdService } from './mission_routinebonus_id.service';

describe('MissionRoutinebonusIdService', () => {
  let service: MissionRoutinebonusIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionRoutinebonusIdService],
    }).compile();

    service = module.get<MissionRoutinebonusIdService>(MissionRoutinebonusIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
