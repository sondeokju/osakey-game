import { Test, TestingModule } from '@nestjs/testing';
import { SuitLevelInfoService } from './suit_level_info.service';

describe('SuitLevelInfoService', () => {
  let service: SuitLevelInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitLevelInfoService],
    }).compile();

    service = module.get<SuitLevelInfoService>(SuitLevelInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
