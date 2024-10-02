import { Test, TestingModule } from '@nestjs/testing';
import { MissionKindService } from './mission_kind.service';

describe('MissionKindService', () => {
  let service: MissionKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionKindService],
    }).compile();

    service = module.get<MissionKindService>(MissionKindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
