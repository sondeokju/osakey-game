import { Test, TestingModule } from '@nestjs/testing';
import { MissionMainService } from './mission_main.service';

describe('MissionMainService', () => {
  let service: MissionMainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionMainService],
    }).compile();

    service = module.get<MissionMainService>(MissionMainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
