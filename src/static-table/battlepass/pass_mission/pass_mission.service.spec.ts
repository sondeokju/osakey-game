import { Test, TestingModule } from '@nestjs/testing';
import { PassMissionService } from './pass_mission.service';

describe('PassMissionService', () => {
  let service: PassMissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassMissionService],
    }).compile();

    service = module.get<PassMissionService>(PassMissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
