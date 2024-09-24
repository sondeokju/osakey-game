import { Test, TestingModule } from '@nestjs/testing';
import { MissionSubService } from './mission_sub.service';

describe('MissionSubService', () => {
  let service: MissionSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionSubService],
    }).compile();

    service = module.get<MissionSubService>(MissionSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
